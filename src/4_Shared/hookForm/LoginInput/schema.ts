import * as yup from 'yup';

const loginInputSchema = yup.object().shape({
  id: yup.string().required("아이디를 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

export default loginInputSchema;