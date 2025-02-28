import React from "react";

const useIndexAutoAnimate = (
  awardsLength: number
): [number, (value: number) => void] => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const animationTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // 자동 애니메이션 설정
  React.useEffect(() => {
    // 애니메이션 타이머 설정
    const startAnimation = () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }

      animationTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;

          if (next + 1 >= awardsLength) {
            return 0;
          }

          return next;
        });
      }, 3000); // 3초마다 이동
    };

    startAnimation();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, [awardsLength]);

  const handleClickCurrentIndex = (value: number) => {
    setCurrentIndex(value);
  };
  return [currentIndex, handleClickCurrentIndex];
};
export default useIndexAutoAnimate;
