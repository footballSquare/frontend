import HoverTrophy from "./ui/HoverTrophy";
import React from "react";
import useIndexAutoAnimate from "./model/useIndexAutoAnimate";
import useIndicator from "./model/useIndicator";
import { TeamAwards } from "../../3_Entity/Team/type";

const AutoMoveAwardList = (props: { awards: TeamAwards[] }) => {
  const { awards } = props;
  const [currentIndex, handleClickCurrentIndex] = useIndexAutoAnimate(
    awards.length
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleTrophyCount] = useIndicator(containerRef); // 현재 컨테이너 사이즈에 따른 트로피 개수

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex gap-4 mt-4 w-[100%]" ref={containerRef}>
          {/* 트로피 컨테이너 */}
          <div className="overflow-hidden relative w-full h-[80px] p-4">
            {awards.map((trophyData, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out `}
                style={{
                  transform: `translateX(${(index - currentIndex) * 120}px)`,
                }}>
                <HoverTrophy trophyData={trophyData} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 현재 트로피 위치 인디케이터 */}
      <div className="flex gap-2 mt-4">
        {/* 전체 트로피 개수 / 현재 보이는 트로피 개수 인디케이터 개수 계산*/}
        {Array.from({ length: awards.length / visibleTrophyCount }).map(
          (_, index) => (
            <div
              key={`indicator-${index}`}
              className={`w-2 h-2 rounded-full ${
                currentIndex >= index * visibleTrophyCount &&
                currentIndex < (index + 1) * visibleTrophyCount
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
              onClick={() =>
                handleClickCurrentIndex(index * visibleTrophyCount)
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default AutoMoveAwardList;
