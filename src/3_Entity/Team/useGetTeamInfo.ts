import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetTeamInfo = (teamListIdx: number): [TeamInfo, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [teamInfo, setTeamInfo] = React.useState<TeamInfo>({} as TeamInfo);

  React.useEffect(() => {
    const endPoint = `/team/${teamListIdx}/information`;
    request("GET", endPoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "team" in serverState) {
      setTeamInfo((serverState as { team: TeamInfo }).team);
    }
  }, [loading, serverState]);

  return [teamInfo, loading];
};

export default useGetTeamInfo;
