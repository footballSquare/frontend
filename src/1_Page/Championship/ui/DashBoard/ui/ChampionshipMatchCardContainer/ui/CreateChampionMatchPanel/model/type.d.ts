type UseTeamListHandlerReturn = {
  selectedTeams: ChampionshipTeamInfo[];
  handleAddTeam: (team: ChampionshipTeamInfo) => void;
  handleRemoveTeam: (team: ChampionshipTeamInfo) => void;
};
