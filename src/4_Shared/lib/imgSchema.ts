import * as yup from "yup";
import { isFileExtension } from "../util/inputValidator";

export const schema = yup.object().shape({
  file: yup
    .mixed<File>()
    .required("이미지를 선택해주세요.")
    .test("fileType", "JPG, PNG, SVG 형식만 가능합니다.", (value) => {
      if (value && value instanceof File) {
        return isFileExtension(value);
      }
      return false;
    })
    .test("fileType", "1MB를 초과할 수 없습니다.", (value) => {
      if (value && value instanceof File) {
        if (value.size >= 1 * 1024 * 1024) {
          return false;
        }
      }
      return true;
    }),
});

export const optionalFileSchema = yup.object().shape({
  file: yup
    .mixed<File>()
    .required("이미지를 선택해주세요.")
    .nullable()
    .test("fileType", "JPG, PNG, SVG 형식만 가능합니다.", (value) => {
      if (!value) {
        // null(파일 없음)이면 통과
        return true;
      }
      if (value instanceof File) {
        return isFileExtension(value);
      }
      return false;
    })
    .test("fileSize", "1MB를 초과할 수 없습니다.", (value) => {
      if (!value) {
        return true;
      }
      if (value instanceof File) {
        return value.size < 1024 * 1024;
      }
      return false;
    }),
});
