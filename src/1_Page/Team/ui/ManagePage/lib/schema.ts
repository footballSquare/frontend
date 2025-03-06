import * as Yup from "yup";

export const schema = Yup.object().shape({
  team_list_name: Yup.string().required("팀 이름을 입력해주세요."),
  team_list_short_name: Yup.string().required("팀 약칭을 입력해주세요."),
  team_list_color: Yup.string().required("팀 색상을 입력해주세요."),
  team_list_emblem: Yup.string().required("팀 엠블렘을 업로드해주세요."),
  team_list_banner: Yup.string().required("팀 배너를 업로드해주세요."),
  team_list_announcement: Yup.string().required("팀 공지사항을 입력해주세요."),
});
