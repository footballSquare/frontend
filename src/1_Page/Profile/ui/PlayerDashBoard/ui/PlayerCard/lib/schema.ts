import * as yup from "yup";

export const schema = yup.object().shape({
  profile_img: yup
    .mixed<File>()
    .nullable()
    .required("프로필 이미지는 필수 입력 항목입니다.")
    .test("fileType", "JPG, PNG, SVG 형식만 가능합니다.", (value) => {
      if (!value) return true; // ✅ null일 경우 검사 통과

      if (typeof value === "string") return true; // ✅ 기본 이미지가 URL(string)인 경우 검사 통과

      if (!(value instanceof File)) return false; // ✅ File이 아닌 경우 검사 실패

      const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".svg"];

      const isValidMimeType = allowedMimeTypes.includes(value.type);
      const isValidExtension = allowedExtensions.some((ext) =>
        value.name.toLowerCase().endsWith(ext)
      );

      return isValidMimeType || isValidExtension;
    }),
});
