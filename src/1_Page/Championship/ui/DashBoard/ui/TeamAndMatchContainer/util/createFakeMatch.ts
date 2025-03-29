export const createFakeMatch = (
  props: UsePostCreateChampionshipMatchProps
): ChampionshipMatchList => {
  const { first_team_idx, second_team_idx } = props;
  return {
    championship_match_idx: Date.now(), // 임시 ID (음수 써도 OK)
    championship_match_first: {
      team_list_idx: first_team_idx,
      championship_match_first_idx: -1,
      team_list_name: "",
      team_list_short_name: "",
      team_list_color: "",
      team_list_emblem: "",
      match_team_stats_our_score: 0,
      match_team_stats_other_score: 0,
      common_status_idx: 0,
    },
    championship_match_second: {
      team_list_idx: second_team_idx,
      championship_match_second_idx: -1,
      team_list_name: "",
      team_list_short_name: "",
      team_list_color: "",
      team_list_emblem: "",
      match_team_stats_our_score: 0,
      match_team_stats_other_score: 0,
      common_status_idx: 0,
    },
  };
};
