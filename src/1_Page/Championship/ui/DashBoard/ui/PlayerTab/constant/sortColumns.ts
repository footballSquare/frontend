export const sortColumns: {
  key: keyof PlayerStats;
  label: string;
  thClass: string;
  buttonClass: string;
  ariaLabel: string;
}[] = [
  {
    key: "player_list_nickname",
    label: "선수",
    thClass: "px-3 py-3 text-left font-semibold w-1/6",
    buttonClass: "flex items-center hover:opacity-80 transition-opacity",
    ariaLabel: "이름으로 정렬",
  },
  {
    key: "match_player_stats_goal",
    label: "득점",
    thClass: "px-3 py-3 w-1/12 font-semibold",
    buttonClass:
      "flex items-center mx-auto hover:opacity-80 transition-opacity",
    ariaLabel: "득점으로 정렬",
  },
  {
    key: "match_player_stats_assist",
    label: "어시스트",
    thClass: "px-3 py-3 w-1/12 font-semibold",
    buttonClass:
      "flex items-center mx-auto hover:opacity-80 transition-opacity",
    ariaLabel: "어시스트로 정렬",
  },
  {
    key: "match_player_stats_successrate_pass",
    label: "패스",
    thClass: "px-3 py-3 w-1/12 font-semibold",
    buttonClass:
      "flex items-center mx-auto hover:opacity-80 transition-opacity",
    ariaLabel: "패스로 정렬",
  },
  {
    key: "match_player_stats_successrate_dribble",
    label: "드리블",
    thClass: "px-3 py-3 w-1/12 font-semibold",
    buttonClass:
      "flex items-center mx-auto hover:opacity-80 transition-opacity",
    ariaLabel: "드리블로 정렬",
  },
  {
    key: "match_player_stats_successrate_tackle",
    label: "태클",
    thClass: "px-3 py-3 w-1/12 font-semibold",
    buttonClass:
      "flex items-center mx-auto hover:opacity-80 transition-opacity",
    ariaLabel: "태클로 정렬",
  },
  {
    key: "match_player_stats_possession",
    label: "점유율",
    thClass: "px-3 py-3 w-1/12 font-semibold",
    buttonClass:
      "flex items-center mx-auto hover:opacity-80 transition-opacity",
    ariaLabel: "점유율로 정렬",
  },
];
