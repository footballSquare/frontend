type MatchCardBoxProps = {
  matchList: ChampionshipMatchList[];
  teamList: ChampionshipTeamInfo[];
  selectedIdx: number;
  handleSelect: (idx: number) => void;
  handleDeleteMatch: (matchIdx: number) => void;
  handleAddMatch: (newMatch: UsePostCreateChampionshipMatchProps) => void;
};
