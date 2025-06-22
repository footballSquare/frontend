export const getSelectedMatchTeams = (
  matchList: ChampionshipMatchList[],
  selectedChampionshipIdx: number
): SelectTeamMatchInfo => {
  if (!matchList || !Array.isArray(matchList) || matchList.length === 0) {
    return { selectTeamList: [], selectTeamScore: [] };
  }

  const selectedMatch = matchList.find(
    (match) => match.championship_match_idx === selectedChampionshipIdx
  );

  const firstTeam = {
    teamName: selectedMatch?.championship_match_first?.team_list_name ?? "",
    teamScore:
      selectedMatch?.championship_match_first?.match_team_stats_our_score ?? 0,
  };

  const secondTeam = {
    teamName: selectedMatch?.championship_match_second?.team_list_name ?? "",
    teamScore:
      selectedMatch?.championship_match_second?.match_team_stats_our_score ?? 0,
  };

  const selectTeamList = [firstTeam.teamName, secondTeam.teamName];

  const selectTeamScore = [firstTeam.teamScore, secondTeam.teamScore];

  return {
    selectTeamList,
    selectTeamScore,
  };
};
