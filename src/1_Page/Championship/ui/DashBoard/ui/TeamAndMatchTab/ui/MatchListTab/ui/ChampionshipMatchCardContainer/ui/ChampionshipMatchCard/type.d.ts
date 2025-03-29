type ChampionshipMatchCardProps = {
  match: ChampionshipMatchList;
  selectedIdx: number;
  index: number;
  handleSelect: (idx: number) => void;
  handleDeleteMatch: (idx: number) => void;
  handleEndMatch: (idx: number) => void;
};
