import * as yup from "yup";

const findPwInputSchema = yup.object().shape({
  phone: yup
    .string()
    .required("핸드폰 번호를 입력해주세요.")
    .matches(
      /^01[0|1]\d{7,8}$/,
      "핸드폰 번호는 010 또는 011로 시작하며 숫자만 입력 가능합니다."
    ),
  id: yup
    .string()
    .required("아이디를 입력해주세요.")
    .matches(/^[A-Za-z\d]{8,20}$/, "아이디는 8~20자, 영문, 숫자만 가능합니다."),
  newPassword: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,20}$/,
      "비밀번호는 5~20자, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인이 필요합니다."),
});

export default findPwInputSchema;
