export const isPastTimeValidation = (
  date?: { key: string; value: string },
  time?: { key: string; value: string }
) => {
  const presentTime = new Date();
  const presentDate = presentTime.toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD)

  if (!date && !time) {
    return null;
  }

  const dateKey = date?.key;
  const dateValue = date?.value;
  const timeKey = time?.key;
  const timeValue = time?.value;

  // 날짜가 있고, 과거 날짜라면 에러 반환
  if (dateValue && new Date(dateValue) < new Date(presentDate)) {
    return {
      field: dateKey,
      message: "과거 날짜는 선택할 수 없습니다.",
    };
  }

  // 시간이 있고, 날짜가 오늘일 경우 현재 시간과 비교
  if (timeValue && dateValue === presentDate) {
    const selectedTime = new Date(`${presentDate}T${timeValue}`);
    if (selectedTime < presentTime) {
      return {
        field: timeKey,
        message: "과거 시간은 선택할 수 없습니다.",
      };
    }
  }

  return null;
};
