type UseManageCreateChampionshipMatchProps = {
  filteredTeamList: ChampionshipTeamInfo[];
  handleAddMatch: (match: ChampionshipMatchList) => void;
  handleSyncMatchIdx: (
    dummyChampMatchIdx: number,
    realChampMatchIdx: number,
    realMatchIdx: number
  ) => void;
  handleSelect: (matchIdx: number) => void;
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
