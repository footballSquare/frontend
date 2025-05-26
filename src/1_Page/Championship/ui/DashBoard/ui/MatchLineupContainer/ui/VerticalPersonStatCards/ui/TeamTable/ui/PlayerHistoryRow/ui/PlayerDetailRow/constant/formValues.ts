export const attackStats = [
  { key: "match_player_stats_goal", label: "득점" },
  { key: "match_player_stats_assist", label: "어시스트" },
  { key: "match_player_stats_standing_tackle", label: "스탠딩 태클" },
  { key: "match_player_stats_sliding_tackle", label: "슬라이딩 태클" },
  { key: "match_player_stats_cutting", label: "가로채기" },
  { key: "match_player_stats_saved", label: "선방" },
] as const;

export const rateStats = [
  {
    key: "match_player_stats_successrate_pass",
    label: "패스 성공률",

    keeperOnly: false,
  },
  {
    key: "match_player_stats_successrate_dribble",
    label: "드리블 성공률",

    keeperOnly: false,
  },
  {
    key: "match_player_stats_successrate_tackle",
    label: "태클 성공률",

    keeperOnly: false,
  },
  {
    key: "match_player_stats_possession",
    label: "점유율",

    keeperOnly: false,
  },
  {
    key: "match_player_stats_successrate_saved",
    label: "선방률",
    keeperOnly: true,
  },
] as const;
