import * as yup from "yup";

// 입력 예외처리 yup
export const schema = yup.object().shape({
  nickname: yup
    .string()
    .required("닉네임은 필수 입력 항목입니다.")
    .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10글자를 초과할 수 없습니다.")
    .matches(/^[A-Za-z0-9가-힣]+$/, "닉네임은 특수문자를 포함할 수 없습니다."),
  platform: yup
    .string()
    .required("플랫폼은 필수 입력 항목입니다.")
    .oneOf(["PC", "XBOX", "PS4", "X"] as const, "유효하지 않은 플랫폼입니다."),
  common_status_idx: yup.number().required("common_status_idx는 필수값입니다."),

  message: yup
    .string()
    .transform((v, orig) => (orig === null ? null : v))
    .notRequired()
    .max(50, "상태메시지는 최대 50글자를 초과할 수 없습니다.")
    .default(null),
  discord_tag: yup
    .string()
    .transform((v, orig) => (orig === null ? null : v))
    .notRequired()
    .max(40, "디스코드 태그는 최대 40글자를 초과할 수 없습니다.")
    .default(null),
  match_position_idx: yup.number().required("포지션은 필수값입니다."),
});
