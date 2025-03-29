type ChampionshipMatchCardContainerProps = {
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
  selectedIdx: number;
  handleSelect: (idx: number) => void;
  handleAddMatch: (newMatch: UsePostCreateChampionshipMatchProps) => void;
  handleDeleteMatch: (matchIdx: number) => void;
};
