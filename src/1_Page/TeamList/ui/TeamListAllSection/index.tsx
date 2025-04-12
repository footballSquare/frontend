import React from "react";
import useGetTeamList from "../../../../3_Entity/Team/useGetTeamList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import TeamSummaryCard from "../../../../2_Widget/TeamSummaryCard";
import searchIcon from "../../../../4_Shared/assets/svg/search.svg";

const TeamListAllSection = () => {
  const [page, setPage] = React.useState<number>(0);
  const [teamLists, hasMoreContent, loading] = useGetTeamList(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div>
      <div className="flex items-center justify-between px-2 ">
        <h2 className="text-lg font-bold mb-3 px-1">모든 팀</h2>
        <button className="p-2 rounded-full bg-gray-100">
          <img src={searchIcon} alt="search" className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm p-4">
        <div className="space-y-3 overflow-y-auto max-h-96 overscroll-contain">
          {teamLists && teamLists.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              등록된 팀이 없습니다
            </div>
          ) : (
            teamLists.map((team, index) => (
              <TeamSummaryCard
                team={team}
                observeRef={
                  teamLists.length === index + 1 ? observeRef : undefined
                }
                key={team.team_list_idx}
              />
            ))
          )}
        </div>

        {loading && (
          <div className="p-4 text-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamListAllSection;
