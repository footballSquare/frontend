import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMyUserIdx } from "../../../../../../../../../../../../../../4_Shared/lib/useMyInfo";
import useToggleState from "../../../../../../../../../../../../../../4_Shared/model/useToggleState";
import StatProgressBar from "./ui/StatProgressBar";
import { attackStats, rateStats } from "./constant/formValues";
import { playerDetailHistoryInputSchema } from "../../../../../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput/schema";
import PlayerStatsDetailInput from "../../../../../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput";

type PlayerDetailRowProps = {
  player: PlayerStats;
};

const PlayerDetailRow = (props: PlayerDetailRowProps) => {
  const { player } = props;

  const [isEditing, toggleIsEditing] = useToggleState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerDetailHistoryInputValues>({
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
      match_player_stats_possession: player.match_player_stats_possession ?? 0,
      match_player_stats_standing_tackle:
        player.match_player_stats_standing_tackle ?? 0,
      match_player_stats_sliding_tackle:
        player.match_player_stats_sliding_tackle ?? 0,
      match_player_stats_cutting: player.match_player_stats_cutting ?? 0,
      match_player_stats_saved: player.match_player_stats_saved ?? 0,
      match_player_stats_successrate_saved:
        player.match_player_stats_successrate_saved ?? 0,
      match_match_idx: player.match_match_idx,
      match_player_stats_evidence_img: undefined,
    },
  });

  const onSubmit: SubmitHandler<PlayerDetailHistoryInputValues> = (data) => {
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
        {isMyPlayer && (
          <div className="flex justify-end gap-2 mb-4">
            {isEditing ? (
              <>
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
              </>
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
                {isEditing && (
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-gray-400">증빙 자료:</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      {...register("match_player_stats_evidence_img")}
                    />
                    {errors.match_player_stats_evidence_img && (
                      <span className="text-xs text-red-500">
                        {
                          errors.match_player_stats_evidence_img
                            .message as string
                        }
                      </span>
                    )}
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
