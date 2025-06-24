type ChampionshipMatchCardProps = {
  match: ChampionshipMatchList;
  isSelected: boolean;
  isMyTeam: boolean;
  handleMatchSelect: (idx: number) => void;
  isListViewMode?: boolean;
} & MatchHandlerReturn;
