type MatchHandlerReturn = {
  handleDeleteMatch: (matchIdx: number) => void;
  handleEndMatch: (matchIdx: number) => void;
  handleRollBackMatchByIdx: (matchIdx: number) => void;
  handleCommitMatches: (idxArr?: number[]) => void;
};
