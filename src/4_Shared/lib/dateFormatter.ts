export const toFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const toFormattedTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatDateKoreanDate = (date: Date): string => {
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTime30 = Array.from({ length: 48 }, (_, i) => {
  const hour = String(Math.floor(i / 2)).padStart(2, "0");
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

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
