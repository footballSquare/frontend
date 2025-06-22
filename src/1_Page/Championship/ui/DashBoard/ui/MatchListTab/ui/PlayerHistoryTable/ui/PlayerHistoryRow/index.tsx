import React from "react";
import { getPositionColor } from "../../../../../../../../../../4_Shared/lib/getPositionColor";
import { matchPosition } from "../../../../../../../../../../4_Shared/constant/matchPosition";
import useToggleState from "../../../../../../../../../../4_Shared/model/useToggleState";
import { useMyUserIdx } from "../../../../../../../../../../4_Shared/lib/useMyInfo";
import { attackStats, rateStats } from "./constant/formValues";
import PlayerStatsDetailInput from "../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput";
import StatEvidenceImgFormPanel from "../../../../../../../../../../2_Widget/StatEvidenceImgFormPanel";
import StatProgressBar from "../../../../../../../../../../4_Shared/components/StatProgressBar";
import usePostPlayerStatsHandler from "./model/usePostPlayerStatsHandler";
import usePlayerStatForm from "./model/usePlayerStatForm";
import usePostPlayerStatsEvidence from "../../../../../../../../../../3_Entity/Match/usePostPlayerStatsEvidence";
import { getDefaultEvidenceUrls } from "./lib/getDefaultEvidenceUrls";

const PlayerHistoryRow = (props: PlayerHistoryRowProps) => {
  const { player, maxGoal, maxAssist, personEvidenceImage } = props;

  const [myUserIdx] = useMyUserIdx();
  const isMine = player.player_list_idx === myUserIdx;
  const [isExpanded, toggleIsExpanded] = useToggleState();
  const [isEditing, toggleIsEditing] = useToggleState();

  const goals = player.match_player_stats_goal ?? 0;
  const assists = player.match_player_stats_assist ?? 0;
  const isTopScorer = goals > 0 && goals === maxGoal;
  const isTopAssist = assists > 0 && assists === maxAssist;
  const highlight = isTopScorer || isTopAssist;

  const { methods, cancelEdit, setBackupPlayerStats } =
    usePlayerStatForm(player);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [postPlayerStats, responseUrl] = usePostPlayerStatsEvidence();
  const defaultEvidenceUrls = getDefaultEvidenceUrls(
    responseUrl,
    personEvidenceImage,
    player.player_list_idx
  );

  const [handlePostPlayerStats] = usePostPlayerStatsHandler(
    cancelEdit,
    setBackupPlayerStats,
    toggleIsEditing
  );

  return (
    <React.Fragment key={player.player_list_idx}>
      <tr
        onClick={toggleIsExpanded}
        className="cursor-pointer hover:bg-grass/10">
        <td className="px-3 py-4 text-base lg:px-4 lg:py-3 lg:text-sm font-semibold text-gray-100 lg:font-medium">
          <div className="flex items-center gap-2 lg:gap-2">
            {highlight && (
              <span className="text-lg lg:text-lg">
                {isTopScorer && isTopAssist ? "👑" : isTopScorer ? "⚽" : "🎯"}
              </span>
            )}
            <span>{player.player_list_nickname}</span>
          </div>
          {isMine && (
            <span className="ml-2 text-xs text-grass font-bold lg:text-xs lg:font-semibold">
              (나)
            </span>
          )}
        </td>
        <td className="px-3 py-4 text-base lg:px-4 lg:py-3 lg:text-sm">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold lg:px-2 lg:py-1 lg:text-xs lg:font-medium`}
            style={{
              color: getPositionColor(player.match_position_idx),
            }}>
            {matchPosition[player.match_position_idx]}
          </span>
        </td>
        <td className="px-3 py-4 text-base lg:px-4 lg:py-3 lg:text-sm text-center text-gray-100">
          <span className={isTopScorer ? "font-bold text-yellow-400" : ""}>
            {goals}
          </span>
        </td>
        <td className="px-3 py-4 text-base lg:px-4 lg:py-3 lg:text-sm text-center text-gray-100">
          <span className={isTopAssist ? "font-bold text-blue-400" : ""}>
            {assists}
          </span>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-800">
          <form
            onSubmit={handleSubmit((data: PlayerStatsFormValues) =>
              handlePostPlayerStats({ matchIdx: player.match_match_idx, data })
            )}>
            <td colSpan={4} className="p-3 lg:p-4">
              {/* 증빙자료와 편집 버튼 영역 - form 밖으로 이동 */}
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-5 lg:gap-4 lg:mb-6">
                {/* 증빙자료 모달 - 모든 사용자가 볼 수 있음 */}
                <div>
                  <StatEvidenceImgFormPanel
                    onSubmit={postPlayerStats}
                    matchIdx={player.match_match_idx}
                    defaultValues={defaultEvidenceUrls}
                    canChange={isMine}
                  />
                </div>

                {/* 편집 버튼들 - 본인만 볼 수 있음 */}
                {isMine && (
                  <div className="flex gap-2 lg:gap-2">
                    {isEditing ? (
                      <div>
                        <button className="px-3 py-2 text-sm lg:px-3 lg:py-1.5 lg:text-sm bg-grass text-gray-900 rounded-lg hover:bg-grass/90 transition-colors font-semibold lg:font-medium flex items-center gap-1 lg:gap-1">
                          💾 저장
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            cancelEdit();
                            toggleIsEditing();
                          }}
                          className="px-3 py-2 text-sm lg:px-3 lg:py-1.5 lg:text-sm text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1 lg:gap-1">
                          ✖ 취소
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={toggleIsEditing}
                        className="px-3 py-2 text-sm lg:px-3 lg:py-1.5 lg:text-sm text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-grass transition-colors flex items-center gap-1 lg:gap-1">
                        ✏ 수정
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* 공격 스탯 + 성공률 */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4">
                <div className="space-y-3 lg:space-y-3">
                  <h4 className="font-bold text-gray-100 text-base lg:font-semibold lg:text-base">
                    공격 스탯
                  </h4>
                  {attackStats.map(({ key, label }) => (
                    <PlayerStatsDetailInput
                      key={key}
                      label={label}
                      name={key}
                      register={register}
                      errors={errors}
                      isEditing={isEditing}>
                      {player[key as keyof PlayerStats] ?? 0}
                    </PlayerStatsDetailInput>
                  ))}
                </div>
                <div className="space-y-3 lg:space-y-3">
                  <h4 className="font-bold text-gray-100 text-base lg:font-semibold lg:text-base">
                    성공률 · 점유율
                  </h4>
                  {rateStats.map(({ key, label, keeperOnly }) =>
                    keeperOnly && player.match_position_idx !== 1 ? null : (
                      <PlayerStatsDetailInput
                        key={key}
                        label={label}
                        name={key}
                        register={register}
                        errors={errors}
                        isEditing={isEditing}>
                        <StatProgressBar
                          value={
                            (player[key as keyof PlayerStats] as number) ?? 0
                          }
                        />
                      </PlayerStatsDetailInput>
                    )
                  )}
                </div>
              </div>
            </td>
          </form>
        </tr>
      )}
    </React.Fragment>
  );
};

export default PlayerHistoryRow;
