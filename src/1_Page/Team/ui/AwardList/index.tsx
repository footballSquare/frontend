import HoverTrophy from "./ui/HoverTrophy";
import useGetTeamAwards from "../../../../3_Entity/Team/useGetTeamAwards";
import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";

const trophiesPerGroup = 5;

const AwardList = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const animationTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [page, setPage] = React.useState<number>(1);
  const [teamAwards, hasMoreContent, loading] = useGetTeamAwards(page);
  const totalGroups = Math.ceil(teamAwards.length / trophiesPerGroup);

  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
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

          // 마지막 트로피에 도달하면 다음 페이지로 이동
          if (next + 2 >= teamAwards.length) {
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
  }, [teamAwards.length]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[100%] flex justify-center items-center">
        <div className="flex gap-4 mt-4 w-[100%]">
          {/* 트로피 컨테이너 */}
          <div className="overflow-hidden relative w-full h-[50px]">
            {teamAwards.map((trophyData, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out ${
                  index === currentIndex
                    ? "scale-110 opacity-100"
                    : index > currentIndex
                    ? "opacity-70"
                    : "opacity-50"
                }`}
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
        {Array.from({ length: totalGroups }).map((_, index) => (
          <div
            key={`indicator-${index}`}
            className={`w-2 h-2 rounded-full ${
              currentIndex >= index * trophiesPerGroup &&
              currentIndex < (index + 1) * trophiesPerGroup
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index * trophiesPerGroup)}
          />
        ))}
      </div>
    </div>
  );
};

export default AwardList;
