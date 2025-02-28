import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { teamHistoryData } from "../../4_Shared/mock/teamInfo";
import { TeamHistory } from "./type";

const useGetTeamHistory = (): [TeamHistory[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [teamHistory, setTeamHistory] = React.useState<TeamHistory[]>([]);

  React.useEffect(() => {
    request(teamHistoryData);
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
