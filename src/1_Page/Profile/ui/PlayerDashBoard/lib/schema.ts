import * as yup from "yup";

// 입력 예외처리 yup
export const schema = yup.object().shape({
  state_message: yup
    .string()
    .required("상태메시지는 필수 입력 항목입니다.")
    .min(2, "상태메시지는 최소 2글자 이상이어야 합니다.")
    .max(20, "상태메시지는 최대 20글자를 초과할 수 없습니다."),

  nickname: yup
    .string()
    .required("닉네임은 필수 입력 항목입니다.")
    .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
    .max(30, "닉네임은 최대 30글자를 초과할 수 없습니다."),

  platform: yup
    .string()
    .required("플랫폼은 필수 선택 항목입니다.")
    .min(2, "플랫폼은 최소 2글자 이상이어야 합니다.")
    .max(20, "플랫폼은 최대 20글자를 초과할 수 없습니다."),

  team: yup
    .string()
    .required("팀은 필수선택사항")
    .min(2, "팀명은 최소 2글자 이상이어야 합니다.")
    .max(50, "팀명은 최대 50글자를 초과할 수 없습니다."),

  position: yup
    .string()
    .required("포지션은 필수선택사항")
    .min(2, "포지션은 최소 2글자 이상이어야 합니다.")
    .max(20, "포지션은 최대 20글자를 초과할 수 없습니다."),
});
