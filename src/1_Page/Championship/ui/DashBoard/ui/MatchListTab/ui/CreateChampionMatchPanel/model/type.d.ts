type UseManageCreateChampionshipMatchProps = {
  filteredTeamList: ChampionshipTeamInfo[];
  handleAddMatch: (match: ChampionshipMatchList) => void;
  handleSyncMatchIdx: (
    dummyChampMatchIdx: number,
    realChampMatchIdx: number,
    firstMatchIdx: number,
    secondMatchIdx: number
  ) => void;
  handleMatchSelect: (matchIdx: number) => void;
  handleBackToList: () => void;
  handleDeleteMatch: (matchIdx: number) => void;
};

type UsePostCreateChampionshipMatchHandlerReturn = {
  handlePostCreateChampionshipMatch: (
    formData: CreateChampionMatchFormValues
  ) => Promise<void>;
};

type UseCreateMatchFormProps = {
  filteredTeamList: ChampionshipTeamInfo[];
};

type UseTeamListHandlerReturn = {
  selectedTeams: ChampionshipTeamInfo[];
  handleAddTeam: (team: ChampionshipTeamInfo) => void;
  handleRemoveTeam: (team: ChampionshipTeamInfo) => void;
};
