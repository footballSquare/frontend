import { SubmitHandler } from "react-hook-form";
import useToggleState from "../../../../../../../../../../../../../../4_Shared/model/useToggleState";
import StatProgressBar from "./ui/StatProgressBar";
import { attackStats, rateStats } from "./constant/formValues";
import PlayerStatsDetailInput from "../../../../../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput";
import StatEvidenceImgFormPanel from "./ui/StatEvidenceImg";
import usePostTeamStatHandler from "./model/usePostTeamStatHandler";
import useTeamStatForm from "./model/useTeamStatForm";
import useChampionshipInfoContext from "../../../../../../../../../../../../../../4_Shared/model/useChampionshipInfoContext";

const PlayerDetailRow = (props: PlayerDetailRowProps) => {
  const { player, isMine } = props;
  const { isCommunityManager, isCommunityOperator } =
    useChampionshipInfoContext();

  const [isEditing, toggleIsEditing] = useToggleState();

  const { methods, cancelEdit, setBackupPlayerStats } = useTeamStatForm(player);
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
    handlePostPlayerStats({ match_match_idx: player.match_match_idx, data });
  };

  return (
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
          {isEditing ? (
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
                    readOnly={false}
                  />
                ))}
                {/* 기존 input 대신 StatEvidenceImgFormPanel 컴포넌트 사용 */}
                {isEditing && (
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-gray-400">증빙 자료:</span>
                    <StatEvidenceImgFormPanel
                      matchIdx={player.match_match_idx}
                      defaultValues={{
                        // player 객체에 증빙자료 URL이 있다면 해당 값을 전달
                        urls: player.match_player_stats_evidence_img
                          ? Array.isArray(
                              player.match_player_stats_evidence_img
                            )
                            ? player.match_player_stats_evidence_img
                            : [player.match_player_stats_evidence_img]
                          : [],
                      }}
                    />
                    {/* 기존 에러 메시지는 패널 내부에서 처리하므로 제거 */}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-100">성공률 · 점유율</h4>
                {rateStats.map(({ key, label, keeperOnly }) =>
                  keeperOnly && player.match_position_idx !== 1 ? null : (
                    <PlayerStatsDetailInput
                      key={key}
                      label={label}
                      name={key}
                      register={register}
                      errors={errors}
                      readOnly={false}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
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
                    readOnly={true}>
                    {player[key as keyof PlayerStats] ?? 0}
                  </PlayerStatsDetailInput>
                ))}
                {/* 읽기 모드에서도 증빙자료 버튼 표시 (선택적) */}
                {player.match_player_stats_evidence_img && (
                  <div className="flex flex-col gap-1 text-sm mt-2">
                    <span className="text-gray-400">증빙 자료:</span>
                    <StatEvidenceImgFormPanel
                      matchIdx={player.match_match_idx}
                      defaultValues={{
                        urls: Array.isArray(
                          player.match_player_stats_evidence_img
                        )
                          ? player.match_player_stats_evidence_img
                          : [player.match_player_stats_evidence_img],
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-100">성공률 · 점유율</h4>
                {rateStats.map(({ key, label, keeperOnly }) =>
                  keeperOnly && player.match_position_idx !== 1 ? null : (
                    <StatProgressBar
                      key={key}
                      label={label}
                      percentage={
                        (player[key as keyof PlayerStats] as number) ?? 0
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}
        </form>
      </td>
    </tr>
  );
};

export default PlayerDetailRow;
