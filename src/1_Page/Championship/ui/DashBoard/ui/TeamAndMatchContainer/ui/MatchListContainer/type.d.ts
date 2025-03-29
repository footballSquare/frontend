type MatchListContainerProps = {
  handleDeleteMatch: (matchIdx: number) => void;
  handleAddMatch: (newMatch: UsePostCreateChampionshipMatchProps) => void;
  matchList: ChampionshipMatchList[];
  filteredTeamList: ChampionshipTeamInfo[];
};

type SelectMatchTeamInfo = {
  teamName: string;
  teamScore: number;
};
