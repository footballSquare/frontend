import * as Yup from "yup";

export const teamManageTextInputSchema = Yup.object().shape({
  team_list_name: Yup.string()
    .required("팀 이름을 입력해주세요.")
    .max(20, "팀 이름은 최대 20글자까지 가능합니다.")
    .matches(/^[가-힣a-zA-Z]+$/, "팀 이름은 한글과 영어만 사용할 수 있습니다."),

  team_list_short_name: Yup.string()
    .required("팀 약칭을 입력해주세요.")
    .length(3, "팀 약칭은 정확히 3글자여야 합니다.")
    .matches(/^[a-zA-Z]+$/, "팀 약칭은 영어만 입력할 수 있습니다."),

  team_list_color: Yup.string().required("팀 색상을 입력해주세요."),

  team_list_announcement: Yup.string()
    .required("팀 공지사항을 입력해주세요.")
    .max(200, "팀 공지사항은 최대 200글자까지 입력 가능합니다."),

  team_list_name_repeat: Yup.boolean()
    .required()
    .oneOf([true], "팀 중복 체크를 완료해주세요."),
  team_list_short_name_repeat: Yup.boolean()
    .required()
    .oneOf([true], "팀 약칭 중복 체크를 완료해주세요."),

  common_status_idx: Yup.number().required("필수값입니다"),
});
