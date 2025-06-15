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
  match_team_stats_possesion: yup
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
  match_team_stats_evidence_img: yup
    .mixed<FileList>()
    .optional()
    .test("fileSize", "파일 크기는 최대 1MB입니다.", (value) => {
      if (!value) return true;
      for (let i = 0; i < value.length; i++) {
        if (value[i].size > 1024 * 1024) return false;
      }
      return true;
    })
    .test("fileFormat", "JPG, JPEG, PNG 파일만 가능합니다.", (value) => {
      if (!value) return true;
      for (let i = 0; i < value.length; i++) {
        if (!["image/jpeg", "image/jpg", "image/png"].includes(value[i].type)) {
          return false;
        }
      }
      return true;
    }),
  match_match_idx: yup.number().required("팀 인덱스를 입력해주세요."),
  match_team_stats_expectation_goal: yup
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
  mom_player_idx: yup.number().required("MOM 선수 인덱스를 입력해주세요."),
});
