import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockCommunityTeamList } from "../../4_Shared/constant/communityTeamList";

const useGetCommunityTeamList = (
  props: UseGetCommunitySTeamListProps
): [CommunityTeam[], boolean] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetch();
  const [communityTeamList, setCommunityTeamList] = React.useState<
  CommunityTeam[]
  >(mockCommunityTeamList.participation_team);

  React.useEffect(() => {
    request(mockCommunityTeamList);
  }, [communityIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityTeamList(
        (serverState as { participation_team: CommunityTeam[] }).participation_team
      );
    }
  }, [loading, serverState]);

  return [communityTeamList, loading];
};

export default useGetCommunityTeamList;
