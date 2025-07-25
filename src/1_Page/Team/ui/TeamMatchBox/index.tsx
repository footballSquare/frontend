import React from "react";
import TeamMatchCard from "./ui/TeamMatchCard";
import useGetTeamMatchList from "../../../../3_Entity/Match/useGetTeamMatchList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";

const TeamMatchBox = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [page, setPage] = React.useState<number>(0);
  const [teamMatchList, hasMoreContent, loading] = useGetTeamMatchList({
    page,
    teamIdx,
  });

  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="flex flex-col space-y-2 overflow-y-auto max-h-[600px]">
      {teamMatchList.length === 0 ? (
        <div>진행중인 경기가 없습니다.</div>
      ) : (
        teamMatchList.map((elem, index) => (
          <TeamMatchCard
            {...elem}
            key={`matchcard-${index}`}
            observeRef={
              teamMatchList.length === index + 1 ? observeRef : undefined
            }
          />
        ))
      )}
    </div>
  );
};

export default TeamMatchBox;
