type EndChampionshipParams = {
  selectTeam: EndTeamInfo | null;
  selectedAwardPlayers: (EndPlayerStatas | null)[];
  championshipEndData: ChampionshipEndData;
};

type IsVlaidEndProps = {
  selectTeam: EndTeamInfo | null;
  selectedAwardPlayers: (EndPlayerStatas | null)[];
};
