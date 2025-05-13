import * as yup from "yup";

export const schema = yup.object({
  category: yup.string().required("말머리를 선택해주세요"),
  title: yup
    .string()
    .required("제목을 입력해주세요")
    .max(50, "제목은 50자 이하로 입력해주세요"),
  body: yup
    .string()
    .required("내용을 입력해주세요")
    .max(6000, "내용은 6000자 이하로 입력해주세요"),
  image: yup
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
});
