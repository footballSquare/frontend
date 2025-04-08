import { useFormContext } from "react-hook-form";
import { matchCount } from "../../../../4_Shared/constant/matchCount";
import TeamCard from "./ui/TeamCard";
import React from "react";
import useGetCommunityTeamList from "../../../../3_Entity/Community/useGetCommunityTeamList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useHandleTeamClick from "./model/useHandleTeamClick";

const TeamTab = () => {
  const { watch, setValue } = useFormContext();

  const communityIdx = useParamInteger("communityIdx");
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
  const championshipType = watch("championship_type_idx");

  const handleTeamClick = useHandleTeamClick({
    watch,
    setValue,
    championshipType,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="font-medium text-gray-700">참가 팀 선택</label>
        <span className="text-sm text-gray-500">
          {watch("participation_team_idxs")?.length || 0}/
          {matchCount[championshipType]} 팀 선택됨
        </span>
      </div>

      {championshipType !== 1 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            {championshipType === 2 ? "16강" : "8강"} 토너먼트는 정확히{" "}
            {matchCount[championshipType]}개의 팀을 선택해야 합니다.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {communityTeamList.map((teamInfo, index) => (
          <TeamCard
            key={`team_card_${teamInfo.team_list_idx || index}`}
            teamInfo={teamInfo}
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
  );
};

export default TeamTab;
