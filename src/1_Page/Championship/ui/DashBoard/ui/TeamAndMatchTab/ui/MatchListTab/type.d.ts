type MatchListTabProps = {
  matchHandlers: MatchHandlerReturn;
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
};

type SelectTeamMatchInfo = {
  selectTeamList: string[];
  selectTeamScore: number[];
};
