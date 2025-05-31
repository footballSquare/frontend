// schema.ts
import * as yup from "yup";

export const playerDetailHistoryInputSchema = yup.object({
  match_player_stats_goal: yup
    .number()
    .required("득점은 필수입니다.")
    .min(0, "0 이상이어야 합니다."),
  match_player_stats_assist: yup
    .number()
    .required("어시스트는 필수입니다.")
    .min(0, "0 이상이어야 합니다."),
  match_player_stats_successrate_pass: yup
    .number()
    .required("패스 성공률은 필수입니다.")
    .min(0, "0 이상이어야 합니다.")
    .max(100, "100 이하이어야 합니다."),
  match_player_stats_successrate_dribble: yup
    .number()
    .required("드리블 성공률은 필수입니다.")
    .min(0, "0 이상이어야 합니다.")
    .max(100, "100 이하이어야 합니다."),
  match_player_stats_successrate_tackle: yup
    .number()
    .required("태클 성공률은 필수입니다.")
    .min(0, "0 이상이어야 합니다.")
    .max(100, "100 이하이어야 합니다."),
  match_player_stats_possesion: yup
    .number()
    .required("점유율은 필수입니다.")
    .min(0, "0 이상이어야 합니다.")
    .max(100, "100 이하이어야 합니다."),
  match_player_stats_standing_tackle: yup
    .number()
    .required("스탠딩 태클 성공 횟수는 필수입니다.")
    .min(0, "0 이상이어야 합니다."),
  match_player_stats_sliding_tackle: yup
    .number()
    .required("슬라이딩 태클 성공 횟수는 필수입니다.")
    .min(0, "0 이상이어야 합니다."),
  match_player_stats_cutting: yup
    .number()
    .required("가로채기는 필수입니다.")
    .min(0, "0 이상이어야 합니다."),
  match_player_stats_saved: yup
    .number()
    .required("선방은 필수입니다.")
    .min(0, "0 이상이어야 합니다."),
  match_player_stats_successrate_saved: yup
    .number()
    .required("선방률은 필수입니다.")
    .min(0, "0 이상이어야 합니다.")
    .max(100, "100 이하이어야 합니다."),
});
