import { useState } from "react";
import useGetTeamMatchList from "../../../../3_Entity/Match/useGetTeamMatchList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import MatchCard from "./ui/MatchCrad";

const PresentMatchBox = () => {
  const [page, setPage] = useState<number>(1);
  const [teamMatchList, hasMoreContent, loading] = useGetTeamMatchList(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
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
  );
};

export default PresentMatchBox;
