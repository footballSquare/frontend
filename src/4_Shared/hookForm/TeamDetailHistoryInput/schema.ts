import * as yup from "yup";
export const teamStatsSchema = yup.object({
  match_team_stats_our_score: yup.number().min(0).required(),
  match_team_stats_other_score: yup.number().min(0).required(),
  match_team_stats_possession: yup.number().min(0).max(100).required(),
  match_team_stats_total_shot: yup.number().min(0).required(),
  match_team_stats_total_pass: yup.number().min(0).required(),
  match_team_stats_total_tackle: yup.number().min(0).required(),
  match_team_stats_success_tackle: yup.number().min(0).required(),
  match_team_stats_expected_goal: yup.number().min(0).required(),
  match_team_stats_saved: yup.number().min(0).required(),
  match_team_stats_cornerkick: yup.number().min(0).required(),
  match_team_stats_freekick: yup.number().min(0).required(),
  match_team_stats_penaltykick: yup.number().min(0).required(),
  match_match_idx: yup.number().required(),
  mom: yup.number().required(),
  match_team_stats_evidence_img: yup
    .mixed<File>()
    .test(
      "fileSize",
      "1 MB 이하 이미지",
      (file) => !file || file.size <= 1024 * 1024
    )
    .test(
      "fileType",
      "JPG,JPEG,PNG 만 허용",
      (file) =>
        !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ),
});
