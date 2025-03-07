import * as yup from "yup";
import { isFileExtension } from "../../../../../../../4_Shared/util/inputValidator";

export const schema = yup.object().shape({
  img: yup
    .mixed<File>()
    .nullable()
    .test("fileType", "JPG, PNG, SVG 형식만 가능합니다.", (value) => {
      if (value && value instanceof File) {
        console.log(value instanceof File);
        return isFileExtension(value);
      }
      return false;
    })
    .test("fileType", "2MB를 초과할 수 없습니다.", (value) => {
      if (value && value instanceof File) {
        if (value.size >= 2 * 1024 * 1024) {
          return false;
        }
      }
      return true;
    }),
});
