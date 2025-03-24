export const getSelectedMatchTeams = (
  matchList: ChampionshipMatchList[],
  selectedIdx: number
): string[] => {
  const selectedMatch = matchList.find(
    (match) => match.championship_match_idx === selectedIdx
  );

  return [
    selectedMatch?.championship_match_second?.team_list_name ?? "",
    selectedMatch?.championship_match_first?.team_list_name ?? "",
  ];
};
