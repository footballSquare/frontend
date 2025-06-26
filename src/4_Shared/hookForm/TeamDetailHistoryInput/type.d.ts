type TeamDetailHistoryInputProps = {
  registerType: keyof PostTeamStatsForm;
  isPercentage?: boolean;
  isEditing?: boolean;
  currentMomPlayer?: PlayerStats | undefined;
};

type PostTeamStatsForm = {
  match_team_stats_our_score: number;
  match_team_stats_other_score: number;
  match_team_stats_possession: number;
  match_team_stats_total_shot: number;
  match_team_stats_total_pass: number;
  match_team_stats_total_tackle: number;
  match_team_stats_success_tackle: number;
  match_team_stats_expected_goal: number;
  match_team_stats_saved: number;
  match_team_stats_cornerkick: number;
  match_team_stats_freekick: number;
  match_team_stats_penaltykick: number;
  mom_player_idx: number;
};
