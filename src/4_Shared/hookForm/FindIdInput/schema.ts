import * as yup from "yup";

const findIdInputSchema = yup.object().shape({
  phone: yup
    .string()
    .required("핸드폰 번호를 입력해주세요.")
    .matches(
      /^01[0|1]\d{7,8}$/,
      "핸드폰 번호는 010 또는 011로 시작하며 숫자만 입력 가능합니다."
    ),
  code: yup.string().required("인증 번호를 입력해주세요."),
});

export default findIdInputSchema;
