import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil.ts";
import { mockChampionshipTeamInfo } from "../../4_Shared/mock/championshipInfo.ts";

const useChampionshipTeams = (
  championshipInfoIdx: number
): [ChampionshipTeamInfo[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [championshipTeam, setChampionshipTeams] = React.useState<
    ChampionshipTeamInfo[]
  >([]);

  React.useEffect(() => {
    request(mockChampionshipTeamInfo);
    console.log(championshipInfoIdx);
  }, []);

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

export default useChampionshipTeams;
