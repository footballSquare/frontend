import React from "react";
import useGetRecruitTeamList from "../../../../3_Entity/Team/useGetRecruitTeamList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import TeamSummaryCard from "../../../../2_Widget/TeamSummaryCard";

const TeamRecruitListSection = () => {
  const [page, setPage] = React.useState<number>(0);
  const [recruitteamLists, hasMoreContent, loading] =
    useGetRecruitTeamList(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-bold text-gray-100 mb-3 px-1">
          팀원 모집 중
        </h2>
      </div>

      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-sm p-4">
        <div className="space-y-3 overflow-y-auto max-h-96 overscroll-contain">
          {recruitteamLists && recruitteamLists.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              등록된 팀이 없습니다
            </div>
          ) : (
            recruitteamLists.map((team, index) => (
              <TeamSummaryCard
                key={team.team_list_idx}
                team={team}
                observeRef={
                  recruitteamLists.length === index + 1 ? observeRef : undefined
                }
              />
            ))
          )}
        </div>

        {loading && (
          <div className="p-4 text-center">
            <div className="w-6 h-6 border-2 border-grass border-t-transparent rounded-full mx-auto animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamRecruitListSection;
