type MatchHandlerReturn = {
  handleDeleteMatch: (matchIdx: number) => void;
  handleEndMatch: (matchIdx: number) => void;
  handleRollBackMatchByIdx: (matchIdx: number) => void;
  handleCommitMatches: (idxArr?: number[]) => void;
  handleSyncMatchIdx: (
    dummyChampMatchIdx: number,
    realChampMatchIdx: number,
    realMatchIdx: number
  ) => void;
  handleAddMatch: (match: ChampionshipMatchList) => void;
};
