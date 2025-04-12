import * as yup from "yup";

export const schema = yup.object().shape({
  team_list_name: yup
    .string()
    .max(20, "최대 20글자까지 가능합니다.")
    .matches(/^[가-힣a-zA-Z]+$/, "한글과 영어만 입력 가능합니다.")
    .required("팀명을 입력해주세요."),
  team_list_short_name: yup
    .string()
    .matches(/^[A-Za-z]{3}$/, "영문 3글자여야 합니다.")
    .required("약칭을 입력해주세요."),
  team_list_color: yup
    .string()
    .matches(/^#([0-9A-F]{6})$/i, "유효한 헥사코드여야 합니다.")
    .required("컬러를 입력해주세요."),
  team_list_announcement: yup
    .string()
    .max(500, "최대 500글자까지 입력할 수 있습니다."),
  common_status_idx: yup
    .number()
    .oneOf([5, 8], "유효하지 않은 상태입니다.")
    .required("모집 상태를 선택해주세요."),
});
