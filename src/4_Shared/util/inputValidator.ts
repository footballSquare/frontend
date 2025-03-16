export const isPastTimeValidation = (
  date?: { key: string; value: string },
  time?: { key: string; value: string }
) => {
  const presentTime = new Date();
  const year = presentTime.getFullYear();
  const month = (presentTime.getMonth() + 1).toString().padStart(2, "0");
  const day = presentTime.getDate().toString().padStart(2, "0");
  const presentDate = `${year}-${month}-${day}`;

  if (!date && !time) {
    return null;
  }

  const dateKey = date?.key;
  const dateValue = date?.value;
  const timeKey = time?.key;
  const timeValue = time?.value;

  // 날짜가 있고, 과거 날짜라면 에러 반환
  if (dateValue) {
    const inputDate = new Date(dateValue);
    const currentDate = new Date(presentDate);

    if (inputDate < currentDate) {
      return {
        field: dateKey,
        message: "과거 날짜는 선택할 수 없습니다.",
      };
    }
  }

  // 시간이 있고, 날짜가 오늘일 경우 현재 시간과 비교
  if (timeValue && dateValue === presentDate) {
    const [hour, minute] = timeValue.split(":").map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hour, minute, 0, 0);

    if (selectedTime < presentTime) {
      console.log("🚨 과거 시간 선택됨");
      return {
        field: timeKey,
        message: "과거 시간은 선택할 수 없습니다.",
      };
    }
  }

  return null;
};

export const isFileExtension = (value: File) => {
  if (!(value instanceof File)) return false;
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml"];
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".svg"];

  const isValidMimeType = allowedMimeTypes.includes(value.type);
  const isValidExtension = allowedExtensions.some((ext) =>
    value.name.toLowerCase().endsWith(ext)
  );

  return isValidMimeType || isValidExtension;
};
