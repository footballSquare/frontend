import React from "react";
import useGetTeamList from "../../../../3_Entity/Team/useGetTeamList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import TeamSummaryCard from "../../../../2_Widget/TeamSummaryCard";
import { findRecentTeam } from "./util/findRecent";
import { useMyTeamIdx } from "../../../../4_Shared/lib/useMyInfo";

const TeamListAllSection = () => {
  const [page, setPage] = React.useState<number>(0);
  const [teamLists, hasMoreContent, loading] = useGetTeamList(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );
  const [myTeamIdx] = useMyTeamIdx();

  return (
    <div>
      <div className="flex items-center justify-between px-2 ">
        <h2 className="text-lg font-bold text-gray-100 mb-3 px-1">모든 팀</h2>
      </div>

      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-sm p-4">
        <div className="space-y-3 overflow-y-auto max-h-96 overscroll-contain">
          {teamLists && teamLists.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              등록된 팀이 없습니다
            </div>
          ) : (
            teamLists.map((team, index) => (
              <TeamSummaryCard
                team={team}
                observeRef={
                  teamLists.length === index + 1 ? observeRef : undefined
                }
                isMyTeam={team.team_list_idx === myTeamIdx}
                isRecent={findRecentTeam(teamLists) === team.team_list_idx}
                key={team.team_list_idx}
              />
            ))
          )}
        </div>

        {loading && (
          <div className="p-4 text-center">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full mx-auto animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamListAllSection;
