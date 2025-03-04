import * as yup from "yup";

// 입력 예외처리 yup
export const schema = yup.object().shape({
  profile_img: yup.string().required("이름은 필수 입력 항목입니다."),
  name: yup
    .string()
    .required("이름은 필수 입력 항목입니다.")
    .min(2, "이름은 최소 2글자 이상이어야 합니다.")
    .max(50, "이름은 최대 50글자를 초과할 수 없습니다."),

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

  tag_discord: yup
    .string()
    .required("디스코드 태그는 필수선택사항")
    .matches(/^#\d{4}$/, "디스코드 태그 형식이 올바르지 않습니다. (예: #1234)"),

  tag: yup
    .string()
    .required("태그는 필수 입력 항목입니다.")
    .min(2, "태그는 최소 2글자 이상이어야 합니다.")
    .max(30, "태그는 최대 30글자를 초과할 수 없습니다."),

  mmr: yup
    .number()
    .required("MMR은 필수 입력 항목입니다.")
    .typeError("MMR은 숫자여야 합니다.")
    .min(0, "MMR은 최소 0 이상이어야 합니다.")
    .max(5000, "MMR은 최대 5000을 초과할 수 없습니다."),

  phone_number: yup
    .string()
    .required("전화번호는 필수사항")
    .matches(
      /^(\d{3})-(\d{4})-(\d{4})$/,
      "전화번호 형식이 올바르지 않습니다. (예: 000-0000-0000)"
    ),
});
