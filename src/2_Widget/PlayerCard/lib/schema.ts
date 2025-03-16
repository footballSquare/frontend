import * as yup from "yup";

export const schema = yup.object().shape({
  profile_img: yup
    .mixed<File>()
    .required("프로필 이미지는 필수 입력 항목입니다.")
    .test("fileType", "JPG, PNG, SVG 형식만 가능합니다.", (value) => {
      if (!value || (value instanceof FileList && value.length === 0)) {
        return true;
      }

      const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".svg"];

      const isValidMimeType = allowedMimeTypes.includes(value.type);
      const isValidExtension = allowedExtensions.some((ext) =>
        value.name.toLowerCase().endsWith(ext)
      );

      return isValidMimeType || isValidExtension;
    }),
});
