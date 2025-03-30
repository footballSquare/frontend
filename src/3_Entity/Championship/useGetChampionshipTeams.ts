import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";
import { mockChampionshipTeamInfo } from "../../4_Shared/mock/championshipInfo.ts";

const useGetChampionshipTeams = (
  championshipListIdx: number
): [ChampionshipTeamInfo[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [championshipTeam, setChampionshipTeams] = React.useState<
    ChampionshipTeamInfo[]
  >([]);

  React.useEffect(() => {
    const endPoint = `/championship/${championshipListIdx}/participation_team`;
    request("GET", endPoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "participation_team" in serverState) {
      setChampionshipTeams(
        (serverState as { participation_team: ChampionshipTeamInfo[] })
          .participation_team
      );
    }
  }, [loading, serverState]);

  return [mockChampionshipTeamInfo.participation_team, loading];
};

export default useGetChampionshipTeams;
