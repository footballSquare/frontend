// 점유율 원형 차트 클립패스 계산
export const calculatePossessionClipPath = (percentage: number) => {
  const angle = (Math.PI * 2 * percentage) / 100;
  const x = 50 + 50 * Math.cos(angle);
  const y = 50 - 50 * Math.sin(angle);
  return `polygon(50% 50%, 50% 0%, ${x}% ${y}%, 100% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`;
};
