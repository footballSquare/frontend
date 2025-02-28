import React from "react";

const useIndicator = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [visibleTrophyCount, setVisibleTrophyCount] = React.useState<number>(0);
  const trophyWidth = 50;
  // 현재 화면에서 보이는 트로피 개수를 동적으로 계산
  React.useEffect(() => {
    const updateVisibleCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const count = Math.floor(containerWidth / trophyWidth / 2);
        setVisibleTrophyCount(count);
      }
    };

    updateVisibleCount(); // 초기 실행
    window.addEventListener("resize", updateVisibleCount); // 화면 크기 변경 감지

    return () => {
      window.removeEventListener("resize", updateVisibleCount); // 클린업
    };
  }, []);

  return [visibleTrophyCount];
};
export default useIndicator;
