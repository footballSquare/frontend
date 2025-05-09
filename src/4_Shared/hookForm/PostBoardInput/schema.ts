import * as yup from "yup";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

const postBoardInputSchema = yup.object().shape({
  title: yup.string().required("제목을 입력해주세요."),
  content: yup.string().required("내용을 입력해주세요."),
  file: yup
    .mixed<FileList>()
    .nullable()
    .test("fileSize", "각 파일은 1MB 이하만 업로드할 수 있습니다.", (value) => {
      if (!value) return true; // 파일이 없어도 통과
      return Array.from(value).every((file) => file.size <= MAX_FILE_SIZE);
    }),
});

export default postBoardInputSchema;
