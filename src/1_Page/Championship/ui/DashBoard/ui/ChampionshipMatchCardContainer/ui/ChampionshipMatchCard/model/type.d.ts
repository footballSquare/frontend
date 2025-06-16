type UseDeleteChampionshipMatchHandlerProps = {
  handleCommitMatches: (idxArr?: number[]) => void;
  handleDeleteMatch: (matchIdx: number) => void;
  handleRollBackMatchByIdx: (matchIdx: number) => void;
};
type UseDeleteChampionshipMatchHandlerReturn = {
  handleDeleteChampionshipMatch: (matchIdx: number) => Promise<void>;
};

type UsePutChampionshipMatchEndHandlerProps = {
  handleEndMatch: (matchIdx: number) => void;
  handleCommitMatches: (idxArr?: number[]) => void;
  handleRollBackMatchByIdx: (matchIdx: number) => void;
};

type UsePutChampionshipMatchEndHandlerReturn = {
  handlePutChampionshipMatchEnd: (matchIdx: number) => Promise<void>;
};
