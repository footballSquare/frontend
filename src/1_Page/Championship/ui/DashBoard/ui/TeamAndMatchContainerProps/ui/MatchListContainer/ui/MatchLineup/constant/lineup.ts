export const basePositionCoordinates: {
  [key: string]: { top: string; left: string };
} = {
  // Goalkeeper
  GK: { top: "88%", left: "50%" },
  // Defenders
  RB: { top: "64%", left: "80%" },
  RCB: { top: "68%", left: "65%" },
  CB: { top: "68%", left: "50%" },
  LCB: { top: "68%", left: "35%" },
  LB: { top: "64%", left: "20%" },
  RWB: { top: "66%", left: "85%" },
  LWB: { top: "66%", left: "15%" },
  // Defensive Midfielders
  RDM: { top: "60%", left: "70%" },
  CDM: { top: "60%", left: "50%" },
  LDM: { top: "60%", left: "30%" },
  // Midfielders
  RM: { top: "50%", left: "85%" },
  RCM: { top: "50%", left: "65%" },
  CM: { top: "50%", left: "50%" },
  LCM: { top: "50%", left: "35%" },
  LM: { top: "50%", left: "15%" },
  // Attacking Midfielders
  RAM: { top: "40%", left: "70%" },
  CAM: { top: "38%", left: "50%" },
  LAM: { top: "40%", left: "30%" },
  // Forwards
  RW: { top: "28%", left: "80%" },
  ST: { top: "20%", left: "50%" },
  LW: { top: "28%", left: "20%" },
  CF: { top: "25%", left: "65%" },
};

// 미리 정의한 팀 스탯 항목 목록 (TeamStats 타입 기준)
export const teamStatKeys: TeamStatKey[] = [
  { label: "Our Score", key: "match_team_stats_our_score" },
  { label: "Other Score", key: "match_team_stats_other_score" },
  { label: "Possession", key: "match_team_stats_possession" },
  { label: "Total Shot", key: "match_team_stats_total_shot" },
  { label: "Expected Goal", key: "match_team_stats_expected_goal" },
  { label: "Total Pass", key: "match_team_stats_total_pass" },
  { label: "Total Tackle", key: "match_team_stats_total_tackle" },
  { label: "Successful Tackle", key: "match_team_stats_success_tackle" },
  { label: "Saved", key: "match_team_stats_saved" },
  { label: "Corner Kick", key: "match_team_stats_cornerkick" },
  { label: "Free Kick", key: "match_team_stats_freekick" },
  { label: "Penalty Kick", key: "match_team_stats_penaltykick" },
  { label: "MOM Player", key: "mom_player_nickname" },
];
