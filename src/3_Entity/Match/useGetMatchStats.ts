import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetMatchStats = (
  props: UseGetMatchStatsProps
): [MatchStats, boolean] => {
  const { matchIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [matchStats, setMatchStats] = React.useState<{
    team_stats: MatchTeamStat;
    player_stats: MatchPlayerStat[];
  }>({} as MatchStats);

  React.useEffect(() => {
    request("GET", `/match/${matchIdx}/stats`, null, true);
  }, [matchIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchStats(serverState as MatchStats);
    }
  }, [loading, serverState]);

  return [matchStats, loading];
};

export default useGetMatchStats;
