type MatchCardProps = {
  match: ChampionshipMatchList;
  selectedIdx: number;
  index: number;
  handleSelect: (idx: number) => void;
  refetch: () => void;
};
