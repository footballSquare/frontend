export const isPastTime = (givenTime: string): boolean => {
  const currentTime = new Date();
  const targetTime = new Date(givenTime);
  targetTime.setHours(targetTime.getHours() + 9); // UTC+9 시간대 적용 (KST)
  
  return targetTime < currentTime; // 주어진 시간이 현재 시간보다 이전이면 true 반환
};