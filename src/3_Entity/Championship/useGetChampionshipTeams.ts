import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipTeams = (
  championshipListIdx: number
): [ChampionshipTeamInfo[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [championshipTeam, setChampionshipTeams] = React.useState<
    ChampionshipTeamInfo[]
  >([]);

  React.useEffect(() => {
    if (championshipListIdx === 0) return;
    const endPoint = `/championship/${championshipListIdx}/participation_team`;
    request("GET", endPoint, null, true);
  }, [championshipListIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState && "participation_team" in serverState) {
      setChampionshipTeams(
        (serverState as { participation_team: ChampionshipTeamInfo[] })
          .participation_team
      );
    }
  }, [loading, serverState]);

  return [championshipTeam, loading];
};

export default useGetChampionshipTeams;
