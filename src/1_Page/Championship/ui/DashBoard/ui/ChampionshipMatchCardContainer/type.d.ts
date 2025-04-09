type ChampionshipMatchCardContainerProps = {
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
  selectedIdx: number;
  handleSelect: (idx: number) => void;
  matchHandlers: MatchHandlerReturn;
  fetchMatchList: () => void;
};
