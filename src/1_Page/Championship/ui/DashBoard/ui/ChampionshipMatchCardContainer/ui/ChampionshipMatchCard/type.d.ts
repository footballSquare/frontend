type ChampionshipMatchCardProps = {
  match: ChampionshipMatchList;
  isSelected: boolean;
  handleSelect: (idx: number) => void;
} & MatchHandlerReturn;
