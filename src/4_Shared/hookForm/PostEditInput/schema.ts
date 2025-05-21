import * as yup from "yup";
export const postEditSchema = yup
  .object({
    board_list_title: yup
      .string()
      .required("제목을 입력해주세요")
      .max(50, "제목은 50자 이하로 입력해주세요")
      .test(
        "noNewLine",
        "제목에 줄바꿈 문자는 사용할 수 없습니다",
        (value) => !/\r|\n/.test(value ?? "")
      ),
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
