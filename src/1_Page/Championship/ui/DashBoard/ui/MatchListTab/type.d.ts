type MatchListTabProps = {
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
  matchHandlers: MatchHandlerReturn;
  handleUpdatePlayer: (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => void;
};
