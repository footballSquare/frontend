export const createDummyMatch = (
  newMatchTeams: ChampionshipTeamInfo[]
): ChampionshipMatchList => {
  return {
    championship_match_idx: 0,
    championship_match_first: {
      team_list_idx: newMatchTeams[0].team_list_idx,
      championship_match_first_idx: -1,
      team_list_name: newMatchTeams[0].team_list_name,
      team_list_short_name: newMatchTeams[0].team_list_short_name,
      team_list_color: newMatchTeams[0].team_list_color,
      team_list_emblem: newMatchTeams[0].team_list_emblem,
      match_team_stats_our_score: 0,
      match_team_stats_other_score: 0,
      common_status_idx: 0,
    },
    championship_match_second: {
      team_list_idx: newMatchTeams[1].team_list_idx,
      championship_match_second_idx: -1,
      team_list_name: newMatchTeams[1].team_list_name,
      team_list_short_name: newMatchTeams[1].team_list_short_name,
      team_list_color: newMatchTeams[1].team_list_color,
      team_list_emblem: newMatchTeams[1].team_list_emblem,
      match_team_stats_our_score: 0,
      match_team_stats_other_score: 0,
      common_status_idx: 0,
    },
  };
};
