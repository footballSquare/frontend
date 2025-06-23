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

type UseSelectHandlerReturn = {
  selectChampionshipMatchIdx: number;
  selectedMatch: ChampionshipMatchList | undefined;
  isMatchDetailView: boolean;
  handleMatchSelect: (championshipMatchIdx: number) => void;
  handleBackToList: () => void;
};

type UseSearchHandlerReturn = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortConfig: {
    key: keyof PlayerStats;
    direction: "asc" | "desc";
  };
  handleSort: (key: keyof PlayerStats) => void;
  displayPlayerStats: PlayerStats[];
  handleUpdatePlayer: (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => void;
};
