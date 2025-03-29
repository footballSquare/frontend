type MatchHandlerReturn = {
  handleDeleteMatch: (matchIdx: number) => void;
  handleAddMatch: (newMatch: UsePostCreateChampionshipMatchProps) => void;
  handleEndMatch: (matchIdx: number) => void;
};
