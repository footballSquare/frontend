type UsePlayerSearchProps = {
  player_list_idx: number;
  player_list_nickname: string;
};

type UseAwardPlayersReturn = {
  selectedAwardPlayers: (EndPlayerStatas | null)[];
  handlePlayerSelectForAward: (
    awardIndex: number,
    player: EndPlayerStatas
  ) => void;
};

type UseTeamSelectReturn = {
  selectTeam: EndTeamInfo | null;
  handleSetSelectTeam: (team: EndTeamInfo) => void;
};

type UsePlayerSearchReturn = {
  playerSearchTerm: string;
  filteredPlayers: EndPlayerStatas[];
  handleSetPlayerSearchTerm: (term: string) => void;
};
