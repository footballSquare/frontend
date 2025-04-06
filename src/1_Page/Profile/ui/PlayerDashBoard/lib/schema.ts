import * as yup from "yup";

// 입력 예외처리 yup
export const schema = yup.object().shape({
  nickname: yup
    .string()
    .required("닉네임은 필수 입력 항목입니다.")
    .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
    .max(30, "닉네임은 최대 30글자를 초과할 수 없습니다."),
  platform: yup
    .string()
    .required("플랫폼은 필수 입력 항목입니다.")
    .oneOf(["PC", "XBOX", "PS4", "X"] as const, "유효하지 않은 플랫폼입니다."),
  discord_tag: yup
    .string()
    .transform((v, orig) => (orig === null ? null : v))
    .notRequired()
    .default(null),
  common_status_idx: yup.number().required("common_status_idx는 필수값입니다."),
  message: yup
    .string()
    .transform((v, orig) => (orig === null ? null : v))
    .notRequired()
    .max(50, "상태메시지는 최대 50글자를 초과할 수 없습니다.")
    .default(null),
  match_position_idx: yup.number().required("포지션은 필수값입니다."),
});
