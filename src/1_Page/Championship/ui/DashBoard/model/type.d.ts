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
};

type UseSelectHandlerReturn = {
  selectChampionshipMatchIdx: number;
  selectedMatch: ChampionshipMatchList | undefined;
  isMatchDetailView: boolean;
  handleMatchSelect: (championshipMatchIdx: number) => void;
  handleBackToList: () => void;
};
