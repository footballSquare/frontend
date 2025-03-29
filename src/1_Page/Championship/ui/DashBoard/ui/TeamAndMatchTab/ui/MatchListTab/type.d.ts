type MatchListTabProps = {
  handleDeleteMatch: (matchIdx: number) => void;
  handleAddMatch: (newMatch: UsePostCreateChampionshipMatchProps) => void;
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
};

type SelectTeamMatchInfo = {
  selectTeamList: string[];
  selectTeamScore: number[];
};
