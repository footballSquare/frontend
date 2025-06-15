import * as yup from "yup";

export const teamStatsSchema = yup.object({
  match_team_stats_our_score: yup
    .number()
    .min(0, "우리 팀 득점은 0 이상이어야 합니다.")
    .required("우리 팀 득점을 입력해주세요."),
  match_team_stats_other_score: yup
    .number()
    .min(0, "상대 팀 득점은 0 이상이어야 합니다.")
    .required("상대 팀 득점을 입력해주세요."),
  match_team_stats_possession: yup
    .number()
    .min(0, "점유율은 0 이상이어야 합니다.")
    .max(100, "점유율은 100 이하이어야 합니다.")
    .required("점유율을 입력해주세요."),
  match_team_stats_total_shot: yup
    .number()
    .min(0, "슛팅 횟수는 0 이상이어야 합니다.")
    .required("슛팅 횟수를 입력해주세요."),
  match_team_stats_total_pass: yup
    .number()
    .min(0, "패스 횟수는 0 이상이어야 합니다.")
    .required("패스 횟수를 입력해주세요."),
  match_team_stats_total_tackle: yup
    .number()
    .min(0, "태클 횟수는 0 이상이어야 합니다.")
    .required("태클 횟수를 입력해주세요."),
  match_team_stats_success_tackle: yup
    .number()
    .min(0, "태클 성공 횟수는 0 이상이어야 합니다.")
    .required("태클 성공 횟수를 입력해주세요."),
  match_team_stats_expected_goal: yup
    .number()
    .min(0, "기대 득점은 0 이상이어야 합니다.")
    .required("기대 득점을 입력해주세요."),
  match_team_stats_saved: yup
    .number()
    .min(0, "선방 횟수는 0 이상이어야 합니다.")
    .required("선방 횟수를 입력해주세요."),
  match_team_stats_cornerkick: yup
    .number()
    .min(0, "코너킥 횟수는 0 이상이어야 합니다.")
    .required("코너킥 횟수를 입력해주세요."),
  match_team_stats_freekick: yup
    .number()
    .min(0, "프리킥 횟수는 0 이상이어야 합니다.")
    .required("프리킥 횟수를 입력해주세요."),
  match_team_stats_penaltykick: yup
    .number()
    .min(0, "페널티킥 횟수는 0 이상이어야 합니다.")
    .required("페널티킥 횟수를 입력해주세요."),
  mom_player_idx: yup
    .number()
    .min(1, "MOM 선수를 선택해주세요.")
    .required("MOM 선수 인덱스를 입력해주세요."),
});
