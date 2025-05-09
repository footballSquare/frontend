export const isPastTime = (givenTime: string): boolean => {
  const currentTime = new Date();

  // 서버에서 UTC를 줌
  const targetTime = new Date(givenTime.replace("Z", "").replace("z", ""));

  return targetTime < currentTime;
};
