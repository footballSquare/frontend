import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil.ts";
import { mockPlayerStats } from "../../4_Shared/mock/championshipInfo.ts";

const useGetPlayerStats = (
  championshipInfoIdx: number
): [PlayerStats[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [playerStats, setPlayerStats] = React.useState<PlayerStats[]>([]);

  React.useEffect(() => {
    request(mockPlayerStats);
    console.log(championshipInfoIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "result" in serverState) {
      setPlayerStats((serverState as { result: PlayerStats[] }).result);
    }
  }, [loading, serverState]);

  return [playerStats, loading];
};

export default useGetPlayerStats;
