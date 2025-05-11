type CreateChampionMatchPanelProps = {
  filteredTeamList: ChampionshipTeamInfo[];
};

type CreateChampionMatchFormValues = {
  teams: number[];
  matchDate: string;
  startTime: string;
};
