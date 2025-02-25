import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { teamInfoData } from "../../4_Shared/mock/teamInfo";
import { TeamInfo } from "./type";

const useGetTeamInfo = (): [TeamInfo | null, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [teamInfo, setTeamInfo] = React.useState<TeamInfo | null>(null);

  React.useEffect(() => {
    request(teamInfoData);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "team" in serverState) {
      setTeamInfo((serverState as { team: TeamInfo }).team);
    }
  }, [loading, serverState]);

  return [teamInfo, loading];
};

export default useGetTeamInfo;
