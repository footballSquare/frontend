import * as Yup from "yup";
import { isFileExtension } from "../../../4_Shared/util/inputValidator";

export const schema = Yup.object().shape({
  championship_type_idx: Yup.number().required("대회 종류는 필수값입니다."),
  championship_list_name: Yup.string()
    .max(30, "대회 이름은 최대 30글자까지 가능합니다.")
    .matches(/^[가-힣A-Za-z\s]+$/, "대회 이름은 한글과 영어만 입력 가능합니다.")
    .required("대회 이름을 입력해주세요."),
  championship_list_description: Yup.string()
    .max(500, "대회 설명은 최대 500글자까지 입력 가능합니다.")
    .required("대회 설명을 입력해주세요."),

  championship_list_color: Yup.string().required("대회 색깔을 선택해주세요."),
  championship_list_start_date:
    Yup.string().required("대회 시작일을 선택해주세요."),
  championship_list_end_date: Yup.string()
    .required("대회 종료일을 선택해주세요.")
    .test(
      "checkDates",
      "종료일은 시작일보다 같거나 늦어야 합니다.",
      function (value) {
        const { championship_list_start_date } = this.parent;
        if (!championship_list_start_date || !value) return true;
        return new Date(championship_list_start_date) <= new Date(value);
      }
    ),
  championship_trophy_img: Yup.mixed<File>()
    .required("이미지를 선택해주세요.")
    .test("fileType", "JPG, PNG, SVG 형식만 가능합니다.", (value) => {
      return isFileExtension(value);
    })
    .test("fileType", "1MB를 초과할 수 없습니다.", (value) => {
      if (value && value instanceof File) {
        if (value.size >= 1 * 1024 * 1024) {
          return false;
        }
      }
      return true;
    }),
  championship_award: Yup.array()
    .of(
      Yup.object().shape({
        championship_award_name: Yup.string()
          .max(50, "수상명은 최대 50글자까지 입력 가능합니다.")
          .required("수상명을 입력해주세요."),
        file: Yup.mixed<File>()
          .required("이미지를 선택해주세요.")
          .test("fileType", "JPG, PNG, SVG 형식만 가능합니다.", (value) => {
            return isFileExtension(value);
          })
          .test("fileType", "1MB를 초과할 수 없습니다.", (value) => {
            if (value && value instanceof File) {
              if (value.size >= 1 * 1024 * 1024) {
                return false;
              }
            }
            return true;
          }),
      })
    )
    .min(1, "개인 수상 항목을 1개 이상 입력해주세요.")
    .required("개인 수상 목록을 입력해주세요."),
  participation_team_idxs: Yup.array()
    .of(Yup.number().required("참여 팀 인덱스가 누락되었습니다."))
    .required("참여 팀 목록 인덱스를 입력해주세요."),

  team_all_success: Yup.bool()
    .required()
    .test(
      "all team Success",
      "토너먼트에 알맞은 팀 수를 입력하세요",
      (value) => {
        return value;
      }
    ),
});

export const defaultValues = {
  championship_type_idx: 1,
  championship_list_name: "",
  championship_list_description: "",
  championship_list_color: "#4f46e5", // 기본 색상
  championship_list_start_date: "",
  championship_list_end_date: "",
  participation_team_idxs: [],
  community_list_idx: 0,
  championship_trophy_img: undefined,
  championship_award: [],
  team_all_success: false,
};
