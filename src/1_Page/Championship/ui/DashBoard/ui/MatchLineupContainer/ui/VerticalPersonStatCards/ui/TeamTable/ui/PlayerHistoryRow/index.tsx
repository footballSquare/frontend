import React from "react";
import { SubmitHandler } from "react-hook-form";
import { getPositionColor } from "../../../../../../../../../../../../4_Shared/lib/getPositionColor";
import { matchPosition } from "../../../../../../../../../../../../4_Shared/constant/matchPosition";
import useToggleState from "../../../../../../../../../../../../4_Shared/model/useToggleState";
import { useMyUserIdx } from "../../../../../../../../../../../../4_Shared/lib/useMyInfo";
import useChampionshipInfoContext from "../../../../../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import { attackStats, rateStats } from "./constant/formValues";
import PlayerStatsDetailInput from "../../../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput";
import StatEvidenceImgFormPanel from "./ui/StatEvidenceImg";
import usePostTeamStatHandler from "./model/usePostTeamStatHandler";
import useTeamStatForm from "./model/useTeamStatForm";

const PlayerHistoryRow = (props: PlayerHistoryRowProps) => {
  const { p, maxGoal, maxAssist } = props;

  const [myUserIdx] = useMyUserIdx();
  const isMine = p.player_list_idx === myUserIdx;
  const [isExpanded, toggleIsExpanded] = useToggleState();
  const [isEditing, toggleIsEditing] = useToggleState();

  const { isCommunityManager, isCommunityOperator } =
    useChampionshipInfoContext();

  const goals = p.match_player_stats_goal ?? 0;
  const assists = p.match_player_stats_assist ?? 0;
  const isTopScorer = goals > 0 && goals === maxGoal;
  const isTopAssist = assists > 0 && assists === maxAssist;
  const highlight = isTopScorer || isTopAssist;

  // PlayerDetailRow logic
  const { methods, cancelEdit, setBackupPlayerStats } = useTeamStatForm(p);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [handlePostPlayerStats] = usePostTeamStatHandler(
    cancelEdit,
    setBackupPlayerStats
  );

  const onSubmit: SubmitHandler<PlayerStatsFormValues> = (data) => {
    toggleIsEditing();
    handlePostPlayerStats({ match_match_idx: p.match_match_idx, data });
  };

  return (
    <React.Fragment key={p.player_list_idx}>
      <tr
        onClick={toggleIsExpanded}
        className="cursor-pointer hover:bg-grass/10">
        <td className="px-4 py-3 font-medium text-gray-100">
          <div className="flex items-center gap-2">
            {highlight && (
              <span className="text-lg">
                {isTopScorer && isTopAssist ? "👑" : isTopScorer ? "⚽" : "🎯"}
              </span>
            )}
            <span>{p.player_list_nickname}</span>
          </div>
          {isMine && (
            <span className="ml-2 text-xs text-grass font-semibold">(나)</span>
          )}
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium`}
            style={{
              color: getPositionColor(p.match_position_idx),
            }}>
            {matchPosition[p.match_position_idx]}
          </span>
        </td>
        <td className="px-4 py-3 text-center text-gray-100">
          <span className={isTopScorer ? "font-bold text-yellow-400" : ""}>
            {goals}
          </span>
        </td>
        <td className="px-4 py-3 text-center text-gray-100">
          <span className={isTopAssist ? "font-bold text-blue-400" : ""}>
            {assists}
          </span>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-800">
          <td colSpan={4} className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 편집 버튼 영역 */}
              {(isMine || isCommunityManager || isCommunityOperator) && (
                <div className="flex justify-end gap-2 mb-4">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-2 py-1 text-sm bg-grass text-gray-900 rounded">
                        💾 저장
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          cancelEdit();
                          toggleIsEditing();
                        }}
                        className="px-2 py-1 text-sm bg-transparent border rounded">
                        ✖ 취소
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={toggleIsEditing}
                      className="px-2 py-1 text-sm bg-transparent border rounded">
                      ✏ 수정
                    </button>
                  )}
                </div>
              )}

              {/* 공격 스탯 + 성공률 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-100">공격 스탯</h4>
                  {attackStats.map(({ key, label }) => (
                    <PlayerStatsDetailInput
                      key={key}
                      label={label}
                      name={key}
                      register={register}
                      errors={errors}
                      isEditing={isEditing}>
                      {p[key as keyof PlayerStats] ?? 0}
                    </PlayerStatsDetailInput>
                  ))}
                  {(isEditing || p.match_player_stats_evidence_img) && (
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="text-gray-400">증빙 자료:</span>
                      <StatEvidenceImgFormPanel
                        matchIdx={p.match_match_idx}
                        defaultValues={{
                          urls: p.match_player_stats_evidence_img
                            ? Array.isArray(p.match_player_stats_evidence_img)
                              ? p.match_player_stats_evidence_img
                              : [p.match_player_stats_evidence_img]
                            : [],
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-100">
                    성공률 · 점유율
                  </h4>
                  {rateStats.map(({ key, label, keeperOnly }) =>
                    keeperOnly && p.match_position_idx !== 1 ? null : (
                      <PlayerStatsDetailInput
                        key={key}
                        label={label}
                        name={key}
                        register={register}
                        errors={errors}
                        isEditing={isEditing}>
                        {p[key as keyof PlayerStats] ?? 0}
                      </PlayerStatsDetailInput>
                    )
                  )}
                </div>
              </div>
            </form>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default PlayerHistoryRow;
