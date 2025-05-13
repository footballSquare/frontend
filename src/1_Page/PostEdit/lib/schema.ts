import * as yup from "yup";
export const schema = yup
  .object({
    // 새 필드
    category: yup
      .number()
      .required("카테고리는 필수 사항입니다")
      .transform((v, o) => (o === "" ? undefined : v))
      .when("board_category_idx", {
        is: (val: unknown) => val === undefined || val === "",
        then: (s) =>
          s
            .typeError("게시판 종류를 선택해주세요")
            .required("게시판 종류를 선택해주세요"),
        otherwise: (s) => s.notRequired(),
      }),
    board_list_title: yup
      .string()
      .required("제목을 입력해주세요")
      .max(50, "제목은 50자 이하로 입력해주세요"),
    board_list_content: yup
      .string()
      .required("내용을 입력해주세요")
      .max(1000, "내용은 1000자 이하로 입력해주세요"),
    board_list_img: yup
      .mixed<FileList>()
      .test("fileSize", "3MB 이하만 업로드 가능합니다", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].size <= 3 * 1024 * 1024;
      })
      .test(
        "fileCount",
        "이미지는 최대 1개만 업로드 가능합니다",
        (value) => !value || value.length <= 1
      ),
  })
  .required();
