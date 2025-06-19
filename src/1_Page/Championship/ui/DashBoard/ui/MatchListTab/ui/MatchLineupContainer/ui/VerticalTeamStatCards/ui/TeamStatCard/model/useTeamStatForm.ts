import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { teamStatsSchema } from "../../../../../../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput/schema";

const useTeamStatForm = (
  teamStats: TeamStats,
  matchIdx: number
): UseTeamStatFormReturn => {
  const methods = useForm<PostTeamStatsForm>({
    resolver: yupResolver(teamStatsSchema),
  });
  const { reset } = methods;

  const backupTeamStatsRef = React.useRef<PostTeamStatsForm | null>(null);

  React.useEffect(() => {
    const initialValues: PostTeamStatsForm = {
      match_team_stats_our_score: teamStats.match_team_stats_our_score ?? 0,
      match_team_stats_other_score: teamStats.match_team_stats_other_score ?? 0,
      match_team_stats_possession: teamStats.match_team_stats_possession ?? 0,
      match_team_stats_total_shot: teamStats.match_team_stats_total_shot ?? 0,
      match_team_stats_total_pass: teamStats.match_team_stats_total_pass ?? 0,
      match_team_stats_total_tackle:
        teamStats.match_team_stats_total_tackle ?? 0,
      match_team_stats_success_tackle:
        teamStats.match_team_stats_success_tackle ?? 0,
      match_team_stats_expected_goal:
        teamStats.match_team_stats_expected_goal ?? 0,
      match_team_stats_saved: teamStats.match_team_stats_saved ?? 0,
      match_team_stats_cornerkick: teamStats.match_team_stats_cornerkick ?? 0,
      match_team_stats_freekick: teamStats.match_team_stats_freekick ?? 0,
      match_team_stats_penaltykick: teamStats.match_team_stats_penaltykick ?? 0,
      mom_player_idx: teamStats.mom_player_idx ?? 0,
    };
    backupTeamStatsRef.current = initialValues;
    reset(initialValues);
  }, [teamStats, matchIdx, reset]);

  const cancelEdit = () => {
    reset(backupTeamStatsRef.current || {});
  };

  const setBackupTeamStats = (data: PostTeamStatsForm) => {
    backupTeamStatsRef.current = data;
  };

  return {
    methods,
    cancelEdit,
    setBackupTeamStats,
  };
};

export default useTeamStatForm;
