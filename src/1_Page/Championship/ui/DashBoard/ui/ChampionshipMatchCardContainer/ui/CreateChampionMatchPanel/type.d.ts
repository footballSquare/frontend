type CreateChampionMatchPanelProps = {
  filteredTeamList: ChampionshipTeamInfo[];
  fetchMatchList: () => void;
};

type CreateChampionMatchFormValues = {
  teams: number[];
  matchDate: string;
  startTime: string;
};
