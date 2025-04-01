import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { teamAwardsData } from "../../4_Shared/mock/teamInfo";

const useGetTeamAwards = (teamListIdx: number): [TeamAwards[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [teamAwards, setTeamAwards] = React.useState<TeamAwards[]>([]);

  React.useEffect(() => {
    request(teamAwardsData);
    console.log(teamListIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "team_award" in serverState) {
      setTeamAwards((prev) => [
        ...prev,
        ...(serverState as { team_award: TeamAwards[] }).team_award,
      ]);
    }
  }, [loading, serverState]);

  return [teamAwards, loading];
};

export default useGetTeamAwards;
