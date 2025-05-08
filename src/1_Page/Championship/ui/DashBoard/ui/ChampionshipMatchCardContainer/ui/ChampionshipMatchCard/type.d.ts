type ChampionshipMatchCardProps = {
  match: ChampionshipMatchList;
  isSelected: boolean;
  handleSelect: (idx: number) => void;
  handleDeleteMatch: (idx: number) => void;
  handleEndMatch: (idx: number) => void;
};
