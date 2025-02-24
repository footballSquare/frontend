import { useState } from "react";
import useGetTeamMatchList from "../../../../3_Entity/Match/useGetTeamMatchList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";

import MatchCard from "./ui/MatchCrad";

const PresentMatch = () => {
  const [page, setPage] = useState(1);
  const [teamMatchList, hasMoreContent, loading] = useGetTeamMatchList(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="col-span-3 space-y-3">
      <h2 className="text-base font-semibold">현재 경기</h2>
      <div className="flex flex-col space-y-2 h-[300px] overflow-scroll">
        {teamMatchList.length === 0 ? (
          <div>진행중인 경기가 없습니다.</div>
        ) : (
          teamMatchList.map((elem, index) => (
            <MatchCard
              {...elem}
              index={index}
              observeRef={
                teamMatchList.length === index + 1 ? observeRef : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PresentMatch;
