import HoverTrophy from "./ui/HoverTrophy";
import useGetTeamAwards from "../../../../3_Entity/Team/useGetTeamAwards";
import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useIndexAutoAnimate from "./model/useIndexAutoAnimate";
import useIndicator from "./model/useIndicator";

const trophiesPerGroup = 5;

const AwardList = () => {
  const [page, setPage] = React.useState<number>(1);
  const [teamAwards, hasMoreContent, loading] = useGetTeamAwards(page);
  const [currentIndex, handleClickCurrentIndex] = useIndexAutoAnimate(
    teamAwards.length
  );
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleTrophyCount] = useIndicator(containerRef);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[100%] flex justify-center items-center">
        <div className="flex gap-4 mt-4 w-[100%]" ref={containerRef}>
          {/* 트로피 컨테이너 */}
          <div className="overflow-hidden relative w-full h-[80px] p-4">
            {teamAwards.map((trophyData, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out `}
                ref={teamAwards.length - 1 === index ? observeRef : null}
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
        {Array.from({ length: visibleTrophyCount }).map((_, index) => (
          <div
            key={`indicator-${index}`}
            className={`w-2 h-2 rounded-full ${
              currentIndex >= index * trophiesPerGroup &&
              currentIndex < (index + 1) * trophiesPerGroup
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
            onClick={() => handleClickCurrentIndex(index * trophiesPerGroup)}
          />
        ))}
      </div>
    </div>
  );
};

export default AwardList;
