import useGetCommunityTeamList from "../../3_Entity/Community/useGetCommunityTeamList";
import React from "react";
import useInfiniteScrollPaging from "../../4_Shared/model/useInfiniteScrollPaging";
const CommunityTeamList = (props: CommunityTeamListProps) => {
  const { communityIdx } = props;
  const [page, setPage] = React.useState<number>(0);
  const [communityTeamList, hasMoreContent, loading] = useGetCommunityTeamList({
    communityIdx,
    page,
  });
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );
  return (
    <div className="bg-white rounded-lg shadow w-full flex flex-col gap-4 overflow-y-auto">
      {communityTeamList.map((team, index) => {
        return (
          <div
            key={index}
            className={` border border-gray shadow-lg rounded-lg p-2 min-h-[120px]`}
            ref={
              communityTeamList.length === index + 1 ? observeRef : undefined
            }
          >
            <h3>TEAM - {team.team_list_name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityTeamList;
