type CreateChampionMatchPanelProps = {
  handleBackToList: () => void;
  filteredTeamList: ChampionshipTeamInfo[];
  handleAddMatch: (match: ChampionshipMatchList) => void;
  handleSyncMatchIdx: (
    dummyChampMatchIdx: number,
    realChampMatchIdx: number,
    firstTeamIdx: number,
    secondTeamIdx: number
  ) => void;
  handleMatchSelect: (idx: number) => void;
  handleDeleteMatch: (idx: number) => void;
};

type CreateChampionMatchFormValues = {
  teams: number[];
  matchDate: string;
  startTime: string;
};

type ChampionshipMatchFormData = {
  first_team_idx: number;
  second_team_idx: number;
  match_match_start_time: string;
};
