import { useFormContext } from "react-hook-form";
import { matchCount } from "../../../../4_Shared/constant/matchCount";
import SelectableTeamCard from "../../../../2_Widget/SelectableTeamCard";
import React from "react";
import useGetCommunityTeamList from "../../../../3_Entity/Community/useGetCommunityTeamList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import { championshipTypes } from "../../../../4_Shared/constant/championshipTypes";
import TeamSelectPanel from "./ui/TeamSelectPanel";

const TeamTab = () => {
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

  const { watch } = useFormContext<ChampionshipFormValues>();
  const championshipType = watch("championship_type_idx");
  const participation_team_idxs = watch("participation_team_idxs");

  return (
    <div>
      {championshipType && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            {championshipType == 0
              ? "리그는 팀 선택 제한이 없습니다"
              : `${championshipTypes[championshipType]}은 정확히 ${matchCount[championshipType]}개의 팀을 선택해야 합니다.`}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between mb-3">
        <label className="font-medium text-gray-700">참가 팀 선택</label>
        <span className="text-sm text-gray-500">
          {participation_team_idxs?.length || 0}/{matchCount[championshipType]}{" "}
          팀 선택됨
        </span>
      </div>

      {participation_team_idxs?.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {communityTeamList
            .filter((team) =>
              participation_team_idxs.includes(team.team_list_idx as number)
            )
            .map((teamInfo) => (
              <SelectableTeamCard
                key={teamInfo.team_list_idx}
                teamInfo={teamInfo}
              />
            ))}
        </div>
      )}

      <TeamSelectPanel
        communityTeamList={communityTeamList}
        observeRef={observeRef}
      />
    </div>
  );
};

export default TeamTab;
