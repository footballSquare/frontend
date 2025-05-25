type UseTeamListHandlerReturn = {
  selectedTeams: ChampionshipTeamInfo[];
  handleAddTeam: (team: ChampionshipTeamInfo) => void;
  handleRemoveTeam: (team: ChampionshipTeamInfo) => void;
};

type UseManageCreateChampionshipMatchProps = {
  handleToggleModal: () => void;
};

type UsePostCreateChampionshipMatchHandlerReturn = {
  handlePostCreateChampionshipMatch: (
    formData: CreateChampionMatchFormValues
  ) => Promise<void>;
};
