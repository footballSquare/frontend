export const convertToFile = (
  image: File | string | null,
  defaultImage: string
): File | null => {
  if (typeof image === "string" && image === defaultImage) {
    return null; // 기본 이미지면 `null` 반환
  }
  return image instanceof File ? image : null; // `File` 객체일 경우 유지
};
