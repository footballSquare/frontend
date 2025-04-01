import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetTeamAwards = (teamListIdx: number): [TeamAwards[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [teamAwards, setTeamAwards] = React.useState<TeamAwards[]>([]);

  React.useEffect(() => {
    const endPoint = `/team/${teamListIdx}/award`;
    request("GET", endPoint, null, true);
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
