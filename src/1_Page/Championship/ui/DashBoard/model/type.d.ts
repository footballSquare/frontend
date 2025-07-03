type MatchHandlerReturn = {
  handleDeleteMatch: (matchIdx: number) => void;
  handleEndMatch: (matchIdx: number) => void;
  handleRollBackMatchByIdx: (matchIdx: number) => void;
  handleCommitMatches: (idxArr?: number[]) => void;
  handleSyncMatchIdx: (
    dummyChampMatchIdx: number,
    realChampMatchIdx: number,
    firstMatchIdx: number,
    secondMatchIdx: number
  ) => void;
  handleAddMatch: (match: ChampionshipMatchList) => void;
  handleUpdateMatchScore: (
    matchIdx: number,
    ourScore: number,
    otherScore: number
  ) => void;
};

type UseGetChampionshipMatchListHandlerReturn = {
  optimisticMatchList: ChampionshipMatchList[];
  matchHandlers: MatchHandlerReturn;
};

type UseSelectHandlerReturn = {
  selectChampionshipMatchIdx: number;
  selectedMatch: ChampionshipMatchList | undefined;
  isMatchDetailView: boolean;
  handleMatchSelect: (championshipMatchIdx: number) => void;
  handleBackToList: () => void;
};

type UseGetPlayerStatsHandlerReturn = {
  optimisticPlayerStats: PlayerStats[];
  handleUpdatePlayer: (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => void;
};
