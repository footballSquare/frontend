import * as yup from "yup";

export const schema = yup.object({
  content: yup
    .string()
    .required("댓글을 입력해주세요.")
    .max(100, "최대 100자까지 입력 가능합니다."),
});
