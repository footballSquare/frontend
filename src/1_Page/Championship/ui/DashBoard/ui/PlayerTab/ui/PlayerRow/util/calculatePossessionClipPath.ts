// 점유율 원형 차트 클립패스 계산
export const calculatePossessionClipPath = (percentage: number) => {
  // 0-100% 범위로 제한
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  if (clampedPercentage === 0) {
    return "polygon(50% 50%, 50% 50%, 50% 50%)"; // 빈 원
  }

  if (clampedPercentage >= 100) {
    return "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)"; // 전체 원
  }

  // 12시 방향부터 시계방향으로 회전
  // 각도를 라디안으로 변환 (0도 = 12시, 90도 = 3시)
  const angle = (clampedPercentage / 100) * 2 * Math.PI - Math.PI / 2;

  // 원의 가장자리 좌표 계산
  const x = 50 + 50 * Math.cos(angle);
  const y = 50 + 50 * Math.sin(angle);

  if (clampedPercentage <= 50) {
    // 50% 이하: 중심점에서 12시 방향으로 시작해서 시계방향으로 회전
    return `polygon(50% 50%, 50% 0%, ${x}% ${y}%)`;
  } else {
    // 50% 초과: 오른쪽 반원을 모두 포함하고 왼쪽으로 계속
    return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, ${x}% ${y}%)`;
  }
};
