import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMyUserIdx } from "../../../../../../../../../../../../../../4_Shared/lib/useMyInfo";
import useToggleState from "../../../../../../../../../../../../../../4_Shared/model/useToggleState";
import StatProgressBar from "./ui/StatProgressBar";
import { attackStats, rateStats } from "./constant/formValues";
import { playerDetailHistoryInputSchema } from "../../../../../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput/schema";
import PlayerStatsDetailInput from "../../../../../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput";
import StatEvidenceImgFormPanel from "./ui/StatEvidenceImg";

const PlayerDetailRow = (props: PlayerDetailRowProps) => {
  const { player } = props;

  const [isEditing, toggleIsEditing] = useToggleState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerStatsFormValues>({
    resolver: yupResolver(playerDetailHistoryInputSchema),
    defaultValues: {
      match_player_stats_goal: player.match_player_stats_goal ?? 0,
      match_player_stats_assist: player.match_player_stats_assist ?? 0,
      match_player_stats_successrate_pass:
        player.match_player_stats_successrate_pass ?? 0,
      match_player_stats_successrate_dribble:
        player.match_player_stats_successrate_dribble ?? 0,
      match_player_stats_successrate_tackle:
        player.match_player_stats_successrate_tackle ?? 0,
      match_player_stats_possesion: player.match_player_stats_possession ?? 0,
      match_player_stats_standing_tackle:
        player.match_player_stats_standing_tackle ?? 0,
      match_player_stats_sliding_tackle:
        player.match_player_stats_sliding_tackle ?? 0,
      match_player_stats_cutting: player.match_player_stats_cutting ?? 0,
      match_player_stats_saved: player.match_player_stats_saved ?? 0,
      match_player_stats_successrate_saved:
        player.match_player_stats_successrate_saved ?? 0,
      match_match_idx: player.match_match_idx,
    },
  });

  const onSubmit: SubmitHandler<PlayerStatsFormValues> = (data) => {
    console.log("✓ saved", data);
    toggleIsEditing(); // close edit mode after save
  };

  const cancelEdit = () => {
    reset();
    toggleIsEditing();
  };

  const [myUserIdx] = useMyUserIdx();
  const isMyPlayer = player.player_list_idx === myUserIdx;

  return (
    <tr className="bg-gray-800">
      <td colSpan={4} className="p-4">
        {/* 편집 버튼 영역 */}
        {!isMyPlayer && (
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
                  onClick={cancelEdit}
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      defaultValues={{
                        match_match_idx: player.match_match_idx,
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
                <input type="hidden" {...register("match_match_idx")} />
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
          </form>
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
                    defaultValues={{
                      match_match_idx: player.match_match_idx,
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
      </td>
    </tr>
  );
};

export default PlayerDetailRow;
