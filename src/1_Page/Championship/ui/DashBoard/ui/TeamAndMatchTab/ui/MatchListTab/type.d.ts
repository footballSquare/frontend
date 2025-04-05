type MatchListTabProps = {
  matchHandlers: MatchHandlerReturn;
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
  fetchMatchList: () => void;
};

type SelectTeamMatchInfo = {
  selectTeamList: string[];
  selectTeamScore: number[];
};
