import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetTeamHistory = (teamListIdx: number): [TeamHistory[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [teamHistory, setTeamHistory] = React.useState<TeamHistory[]>([]);

  React.useEffect(() => {
    const endPoint = `/team/${teamListIdx}/history`;
    request("GET", endPoint, null, true);
    console.log(teamListIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "team_history" in serverState) {
      setTeamHistory(
        (serverState as { team_history: TeamHistory[] }).team_history
      );
    }
  }, [loading, serverState]);

  return [teamHistory, loading];
};

export default useGetTeamHistory;
