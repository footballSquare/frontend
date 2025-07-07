type ChampionshipMatchCardProps = {
  match: ExpandedMatchList;
  handleMatchSelect: (idx: number) => void;
  isListViewMode?: boolean;
  isMyTeam?: boolean;
  isSelected?: boolean;
} & MatchHandlerReturn;
