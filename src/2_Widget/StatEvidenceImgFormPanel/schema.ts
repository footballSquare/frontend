import * as yup from "yup";

export const statsEvidenceSchema = yup.object({
  // images: ImageItem[] 배열 (최대 5개)
  images: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required("이미지 ID가 필요합니다.").trim(),
        url: yup.string().when("deleted", {
          is: true,
          then: (schema) => schema.notRequired().nullable(),
          otherwise: (schema) =>
            schema
              .required("이미지 URL이 필요합니다.")
              .typeError("URL은 문자열이어야 합니다.")
              .test(
                "valid-url",
                "유효한 URL 형식이 아닙니다.",
                function (value) {
                  if (!value || typeof value !== "string") return false;

                  const { parent } = this;

                  // new 타입인 경우 blob URL 허용
                  if (parent.type === "new") {
                    return (
                      value.startsWith("blob:") ||
                      value.startsWith("data:") ||
                      /^https?:\/\/.+/.test(value)
                    );
                  }

                  // existing 타입인 경우 일반적인 URL 형식만 허용
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return false;
                  }
                }
              ),
        }),
        type: yup
          .mixed<"existing" | "new">()
          .oneOf(
            ["existing", "new"],
            "type은 'existing' 또는 'new' 중 하나여야 합니다."
          )
          .when("deleted", {
            is: true,
            then: (schema) => schema.notRequired(),
            otherwise: (schema) =>
              schema.required("이미지 타입을 지정해주세요."),
          }),
        // file은 type이 "new"일 때만 유효성 검사
        file: yup.mixed<File>().when(["type", "deleted"], {
          is: (type: string, deleted: boolean) => type === "new" && !deleted,
          then: (schema) =>
            schema
              .required("새로 업로드할 파일을 선택해주세요.")
              // 용량 검사: 최대 1MB
              .test(
                "fileSize",
                "각 파일은 최대 1MB까지 업로드 가능합니다.",
                (file) => {
                  if (!file) return false;
                  return file.size <= 1024 * 1024;
                }
              )
              // 파일 타입 검사: JPEG, JPG, PNG만 허용
              .test(
                "fileType",
                "JPG, JPEG, PNG 파일만 업로드 가능합니다.",
                (file) => {
                  if (!file) return false;
                  return ["image/jpeg", "image/jpg", "image/png"].includes(
                    file.type
                  );
                }
              ),
          otherwise: (schema) => schema.notRequired().nullable(),
        }),
        deleted: yup.boolean().optional(),
      })
    )
    .required("증빙 이미지를 최소 하나 이상 등록해야 합니다.")
    .test(
      "min-active-images",
      "활성 증빙 이미지는 최소 1개 이상 입력해야 합니다.",
      function (images) {
        if (!images) return false;
        const activeImages = images.filter((img) => !img.deleted);
        return activeImages.length >= 1;
      }
    )
    .test(
      "max-active-images",
      "활성 증빙 이미지는 최대 5개까지 등록할 수 있습니다.",
      function (images) {
        if (!images) return true;
        const activeImages = images.filter((img) => !img.deleted);
        return activeImages.length <= 5;
      }
    ),
});
