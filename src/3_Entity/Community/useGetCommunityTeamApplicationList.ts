import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetCommunityTeamApplicationList = (
  props: UseGetCommunityTeamApplicationListProps
): [
  CommunityTeam[],
  React.Dispatch<React.SetStateAction<CommunityTeam[]>>,
  boolean
] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [communityTeamApplicationList, setCommunityTeamApplicationList] =
    React.useState<CommunityTeam[]>([]);

  React.useEffect(() => {
    request("GET", `/community/${communityIdx}/team/application`, null, false);
  }, [communityIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityTeamApplicationList(
        (serverState as { team_list: CommunityTeam[] }).team_list
      );
      console.log(serverState)
    }
  }, [loading, serverState]);

  return [
    communityTeamApplicationList,
    setCommunityTeamApplicationList,
    loading,
  ];
};

export default useGetCommunityTeamApplicationList;
