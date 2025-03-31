import React from "react";
import MatchCard from "./ui/MatchCrad";
import useGetTeamMatchList from "../../../../3_Entity/Match/useGetTeamMatchList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useDisplayMatchInfoStore from "../../../../4_Shared/zustand/useDisplayMatchInfoStore";

const PresentMatchBox = () => {
  const team_list_idx = useParamInteger("team_list_idx");
  const [page, setPage] = React.useState<number>(1);
  const [teamMatchList, hasMoreContent, loading] = useGetTeamMatchList({
    page,
    teamIdx: team_list_idx,
  });

  const { displayData, insertDisplayData } = useDisplayMatchInfoStore();

  React.useEffect(() => {
    insertDisplayData(teamMatchList);
  }, [teamMatchList]);

  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="flex flex-col space-y-2 h-[300px] overflow-scroll">
      {displayData.length === 0 ? (
        <div>진행중인 경기가 없습니다.</div>
      ) : (
        displayData.map((elem, index) => (
          <MatchCard
            {...elem}
            index={index}
            observeRef={
              displayData.length === index + 1 ? observeRef : undefined
            }
          />
        ))
      )}
    </div>
  );
};

export default PresentMatchBox;
