import * as yup from "yup";

export const playerDetailHistoryInputSchema = yup.object({
  match_player_stats_goal: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0, "0 이상")
    .required("필수값"),

  match_player_stats_assist: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0, "0 이상")
    .required("필수값"),

  match_player_stats_successrate_pass: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .max(100)
    .required("0~100 사이"),

  match_player_stats_successrate_dribble: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .max(100)
    .required("0~100 사이"),

  match_player_stats_successrate_tackle: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .max(100)
    .required("0~100 사이"),

  match_player_stats_possession: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .max(100)
    .required("0~100 사이"),

  match_player_stats_standing_tackle: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .required("0 이상"),

  match_player_stats_sliding_tackle: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .required("0 이상"),

  match_player_stats_cutting: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .required("0 이상"),

  match_player_stats_saved: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .required("0 이상"),

  match_player_stats_successrate_saved: yup
    .number()
    .typeError("숫자를 입력하세요")
    .min(0)
    .max(100)
    .required("0~100 사이"),

  match_match_idx: yup
    .number()
    .typeError("숫자를 입력하세요")
    .required("필수값"),

  match_player_stats_evidence_img: yup
    .mixed<File>()
    .test(
      "fileSize",
      "1 MB 이하 이미지",
      (file) => !file || file.size <= 1024 * 1024
    )
    .test(
      "fileType",
      "JPG,JPEG,PNG 만 허용",
      (file) =>
        !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ),
});
