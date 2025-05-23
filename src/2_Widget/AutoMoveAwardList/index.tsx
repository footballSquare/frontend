import HoverTrophy from "./ui/HoverTrophy";
import React from "react";
import useIndexAutoAnimate from "./model/useIndexAutoAnimate";
import useIndicator from "./model/useIndicator";

const AutoMoveAwardList = (props: AutoMoveAwardListProps) => {
  const { awards } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleTrophyCount] = useIndicator(containerRef);
  const [currentIndex, handleClickCurrentIndex] = useIndexAutoAnimate(
    awards.length
  );
  const indicator =
    visibleTrophyCount > 0 ? awards.length / visibleTrophyCount + 1 : 1;

  return (
    <div className="w-full text-white ">
      <div className="flex justify-center items-center">
        <div className="flex gap-4 mt-4 w-full" ref={containerRef}>
          {/* 트로피 컨테이너 */}
          <div className="overflow-hidden relative h-[80px] p-4 w-full">
            {awards.map((trophyData, index) => (
              <div
                key={index}
                className="absolute transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateX(${(index - currentIndex) * 120}px)`,
                }}>
                <HoverTrophy key={`trophy-${index}`} trophyData={trophyData} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 현재 트로피 위치 인디케이터 */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: indicator }).map((_, index) => (
          <div
            key={`indicator-${index}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex >= index * visibleTrophyCount &&
              currentIndex < (index + 1) * visibleTrophyCount
                ? "bg-grass"
                : "bg-gray-300"
            }`}
            onClick={() => handleClickCurrentIndex(index * visibleTrophyCount)}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoMoveAwardList;
