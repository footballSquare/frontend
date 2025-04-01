import React from "react";
import MatchCard from "./ui/MatchCrad";
import useGetTeamMatchList from "../../../../3_Entity/Match/useGetTeamMatchList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useDisplayMatchInfoStore from "../../../../4_Shared/zustand/useDisplayMatchInfoStore";

const PresentMatchBox = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [page, setPage] = React.useState<number>(1);
  const [teamMatchList, hasMoreContent, loading] = useGetTeamMatchList({
    page,
    teamIdx,
  });

  const { displayData, insertDisplayData, clearDisplayData } =
    useDisplayMatchInfoStore();

  React.useEffect(() => {
    clearDisplayData();
    return () => {
      clearDisplayData();
    };
  }, []);

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
