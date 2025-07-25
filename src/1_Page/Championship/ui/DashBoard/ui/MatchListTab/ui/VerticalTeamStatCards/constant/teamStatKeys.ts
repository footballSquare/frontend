export const statLabels: Array<{
  key: keyof PostTeamStatsForm;
  label: string;
  isFile?: boolean;
  isPercentage?: boolean;
  isMomField?: boolean;
}> = [
  { key: "match_team_stats_our_score", label: "우리 팀 득점" },
  { key: "match_team_stats_other_score", label: "상대 팀 득점" },
  {
    key: "match_team_stats_possession",
    label: "점유율",
    isPercentage: true,
  },
  { key: "match_team_stats_total_shot", label: "슛팅 횟수" },
  { key: "match_team_stats_total_pass", label: "패스 횟수" },
  { key: "match_team_stats_total_tackle", label: "태클 횟수" },
  { key: "match_team_stats_success_tackle", label: "태클 성공 횟수" },
  { key: "match_team_stats_expected_goal", label: "기대 득점" },
  { key: "match_team_stats_saved", label: "선방 횟수" },
  { key: "match_team_stats_cornerkick", label: "코너킥 횟수" },
  { key: "match_team_stats_freekick", label: "프리킥 횟수" },
  { key: "match_team_stats_penaltykick", label: "페널티킥 횟수" },
  { key: "mom_player_idx", label: "MOM 선수", isMomField: true },
];
