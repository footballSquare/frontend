export const isPastTime = (givenTime: string): boolean => {
  const currentTime = new Date();
  const targetTime = new Date(givenTime);
  
  return targetTime < currentTime; // 주어진 시간이 현재 시간보다 이전이면 true 반환
};