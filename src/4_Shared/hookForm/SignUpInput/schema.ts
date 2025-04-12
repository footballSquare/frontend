import * as yup from "yup";

export const firstStepSignUpInputSchema = yup.object().shape({
  id: yup
    .string()
    .required("아이디를 입력해주세요.")
    .matches(/^[A-Za-z\d]{8,20}$/, "아이디는 8~20자, 영문, 숫자만 가능합니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "비밀번호는 8~20자, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const secondStepSignUpInputSchema = yup.object().shape({
  nickName: yup.string().required("Nickname is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  statusMessage: yup.string().optional(),
  discordTag: yup
    .string()
    .required("Discord tag is required")
    .matches(/^.+#\d{4}$/, "Discord tag must be in the format username#1234"),
});
