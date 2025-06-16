type ChampionshipMatchCardContainerProps = {
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
  selectedIdx: number;
  handleSelect: (idx: number) => void;
  matchHandlers: MatchHandlerReturn;
  isListViewMode?: boolean; // 리스트 전용 모드인지 여부
};
