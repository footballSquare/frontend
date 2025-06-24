export const buildDummyChampionshipMatch = (
  dummyMatchIdx: number,
  formData: ChampionshipMatchFormData,
  filteredTeamList: ChampionshipTeamInfo[]
): ChampionshipMatchList => {
  const teamMap: Record<number, ChampionshipTeamInfo> = Object.fromEntries(
    filteredTeamList.map((team) => [team.team_list_idx, team])
  );
  const championship_match_idx = dummyMatchIdx; // 더미용 unique key

  const buildBase = (teamIdx: number, matchIdx: number) => {
    const team = teamMap[teamIdx] ?? {
      team_list_idx: teamIdx,
      team_list_name: `[TEST] Team ${teamIdx}`,
      team_list_short_name: `T${teamIdx}`,
      team_list_color: "#CCCCCC",
      team_list_emblem: null,
    };

    const {
      team_list_idx,
      team_list_name,
      team_list_short_name,
      team_list_color,
      team_list_emblem,
    } = team;

    return {
      team_list_idx,
      team_list_name,
      team_list_short_name,
      team_list_color,
      team_list_emblem,
      common_status_idx: 0,
      match_match_idx: matchIdx,
      match_team_stats_other_score: null,
      match_team_stats_our_score: null,
    };
  };

  return {
    match_match_start_time: new Date(dummyMatchIdx).toISOString(),
    championship_match_idx,
    championship_match_first: {
      ...buildBase(formData.first_team_idx, championship_match_idx * 2),
    },
    championship_match_second: {
      ...buildBase(formData.second_team_idx, championship_match_idx * 2 + 1),
    },
  };
};
