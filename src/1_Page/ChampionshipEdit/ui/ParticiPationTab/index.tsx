import React from "react";

import useValidParamInteger from "../../../../4_Shared/model/useValidParamInteger";
import useGetCommunityTeamList from "../../../../3_Entity/Community/useGetCommunityTeamList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";

const ParticiPationTab = () => {
  const [communityIdx] = useValidParamInteger("communityIdx");
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
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium text-gray-700">참가 팀 선택</label>
          <span className="text-sm text-gray-500">
            {selectedTeams.length}/{getMaxTeams()} 팀 선택됨
          </span>
        </div>

        {competitionType !== "league" && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              {competitionType === "tournament16" ? "16강" : "8강"} 토너먼트는
              정확히 {getMaxTeams()}개의 팀을 선택해야 합니다.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {communityTeamList.map((teamInfo, index) => (
            <TeamCard
              key={`team_card_${teamInfo.team_list_idx || index}`}
              teamInfo={teamInfo}
              selectedTeams={selectedTeams}
              handleTeamClick={handleTeamClick}
            />
          ))}
        </div>
        {loading && (
          <div className="col-span-full py-4 text-center text-gray-500">
            팀 목록을 불러오는 중...
          </div>
        )}
        <div ref={observeRef} />
      </div>

      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={() => setActiveTab("basic")}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
          이전: 기본 정보
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("awards")}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
          다음: 수상 항목
        </button>
      </div>
    </div>
  );
};
export default ParticiPationTab;
