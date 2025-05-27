type VerticalTeamStatCardsProps = {
  teamName: string;
  stats: TeamStats;
};
type PostTeamStatsForm = {
  match_team_stats_our_score: number;
  match_team_stats_other_score: number;
  match_team_stats_possesion: number;
  match_team_stats_total_shot: number;
  match_team_stats_total_pass: number;
  match_team_stats_total_tackle: number;
  match_team_stats_success_tackle: number;
  match_team_stats_expectation_goal: number;
  match_team_stats_saved: number;
  match_team_stats_cornerkick: number;
  match_team_stats_freekick: number;
  match_team_stats_penaltykick: number;
  match_match_idx: number;
  mom: number;
  match_team_stats_evidence_img?: File; // null 제거
};
