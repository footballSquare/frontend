import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";
import { mockPlayerStats } from "../../4_Shared/mock/championshipInfo";

const useGetPlayerStats = (
  championshipListIdx: number
): [PlayerStats[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [playerStats, setPlayerStats] = React.useState<PlayerStats[]>([]);

  React.useEffect(() => {
    const endPoint = `/championship/${championshipListIdx}/player_stats`;
    request("GET", endPoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "result" in serverState) {
      setPlayerStats((serverState as { result: PlayerStats[] }).result);
    }
  }, [loading, serverState]);

  return [mockPlayerStats.result, loading];
};

export default useGetPlayerStats;
