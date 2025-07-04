//  * 날짜를 표시용 문자열로 포맷합니다 X월 X일
export const formatDateForDisplay = (date: Date): string => {
  const today = new Date();
  const inputNormalized = new Date(date);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (inputNormalized.getTime() === today.getTime()) {
    return "오늘";
  } else if (inputNormalized.getTime() === tomorrow.getTime()) {
    return "내일";
  } else if (inputNormalized.getTime() === yesterday.getTime()) {
    return "어제";
  }

  return `${inputNormalized.getMonth() + 1}월 ${inputNormalized.getDate()}일`;
};

//  * 특정 날짜에 매치가 있는지 확인합니다

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
