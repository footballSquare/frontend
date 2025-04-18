import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockMatchStats } from "../../4_Shared/mock/matchStats";

const useGetMatchStats = (
  props: UseGetMatchStatsProps
): [MatchStats, boolean] => {
  const { matchIdx } = props;
  const [serverState, request, loading] = useFetch();
  const [matchStats, setMatchStats] = React.useState<{
    team_stats: MatchTeamStat;
    player_stats: MatchPlayerStat[];
  }>({
    team_stats: mockMatchStats.team_stats,
    player_stats: mockMatchStats.player_stats,
  });

  React.useEffect(() => {
    request({
      team_stats: mockMatchStats.team_stats,
      player_stats: mockMatchStats.player_stats,
    });
  }, [matchIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchStats(serverState as MatchStats);
    }
  }, [loading, serverState]);

  return [matchStats, loading];
};

export default useGetMatchStats;
