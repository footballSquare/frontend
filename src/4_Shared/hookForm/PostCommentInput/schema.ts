import * as yup from "yup";

export const commentSchema = yup
  .object({
    content: yup
      .string()
      .required("댓글을 입력해주세요.")
      .max(100, "댓글은 100자 이하로 입력해야 합니다."),
  })
  .required();
