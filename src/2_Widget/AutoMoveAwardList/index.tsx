import HoverTrophy from "./ui/HoverTrophy";
import React from "react";
import useIndexAutoAnimate from "./model/useIndexAutoAnimate";
import useIndicator from "./model/useIndicator";
import { TeamAwards } from "../../3_Entity/Team/type";
import STYLE from "./style";

const AutoMoveAwardList = ({ awards }: { awards: TeamAwards[] }) => {
  const [currentIndex, handleClickCurrentIndex] = useIndexAutoAnimate(
    awards.length
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleTrophyCount] = useIndicator(containerRef); // 현재 컨테이너 사이즈에 따른 트로피 개수
  const indicator =
    visibleTrophyCount > 0 ? awards.length / visibleTrophyCount + 1 : 1;

  return (
    <div>
      <div className={STYLE.container}>
        <div className={STYLE.trophyWrapper} ref={containerRef}>
          {/* 트로피 컨테이너 */}
          <div className={STYLE.trophyContainer}>
            {awards.map((trophyData, index) => (
              <div
                key={index}
                className={STYLE.trophyItem}
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
      <div className={STYLE.indicatorWrapper}>
        {Array.from({ length: indicator }).map((_, index) => (
          <div
            key={`indicator-${index}`}
            className={`${STYLE.indicator} ${
              currentIndex >= index * visibleTrophyCount &&
              currentIndex < (index + 1) * visibleTrophyCount
                ? STYLE.indicatorActive
                : STYLE.indicatorInactive
            }`}
            onClick={() => handleClickCurrentIndex(index * visibleTrophyCount)}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoMoveAwardList;
