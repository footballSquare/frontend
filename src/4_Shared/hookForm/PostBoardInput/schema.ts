import * as yup from "yup";

const postBoardInputSchema = yup.object().shape({
  title: yup.string().required("제목을 입력해주세요."),
  content: yup.string().required("내용을 입력해주세요."),
  file: yup.mixed<File>().required("이미지를 선택해주세요."),
});

export default postBoardInputSchema;
