export const findNearDate = (date: Date): { hour: string; min: string } => {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 30) {
    minutes = 30;
  } else {
    minutes = 0;
    hours += 1; // 다음 시간으로 이동
  }

  const formattedHour = hours.toString().padStart(2, "0");
  const formattedMin = minutes.toString().padStart(2, "0");

  return { hour: formattedHour, min: formattedMin };
};
