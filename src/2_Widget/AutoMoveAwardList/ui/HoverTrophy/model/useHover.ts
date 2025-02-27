import React from "react";
const useHover = (): [
  boolean,
  { x: number; y: number },
  () => void,
  (event: React.MouseEvent) => void,
  () => void
] => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [hoverPosition, setHoverPosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    setIsHovered(true);
    const rect = event.currentTarget.getBoundingClientRect();

    const screenCenter = window.innerWidth / 2; // 화면 중앙
    const offset = 60; // 추가 여백

    setHoverPosition({
      x:
        rect.left +
        window.scrollX +
        rect.width / 2 +
        (rect.left < screenCenter ? offset : -offset), // 좌우 방향 조정
      y: rect.top + window.scrollY + rect.height, // 약간 아래로 조정
    });
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return [
    isHovered,
    hoverPosition,
    handleHover,
    handleMouseEnter,
    handleMouseLeave,
  ];
};
export default useHover;
