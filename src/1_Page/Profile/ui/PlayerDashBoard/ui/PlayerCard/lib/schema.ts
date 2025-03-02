import * as yup from "yup";

export const schema = yup.object().shape({
  profile_img: yup
    .mixed<File>()
    .nullable()
    .required("프로필 이미지는 필수 입력 항목입니다.")
    .test("fileType", "JPG, PNG 형식만 가능합니다.", (value) => {
      return (
        value instanceof File &&
        ["image/jpeg", "image/png"].includes(value.type)
      );
    }),
});
