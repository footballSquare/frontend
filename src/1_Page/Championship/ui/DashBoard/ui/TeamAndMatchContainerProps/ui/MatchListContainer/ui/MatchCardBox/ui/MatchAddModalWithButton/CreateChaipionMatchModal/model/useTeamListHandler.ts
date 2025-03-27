import React from "react";
import { UseFormSetValue } from "react-hook-form";

const useTeamListHandler = (
  setValue: UseFormSetValue<CreateChampionMatchFormValues>
): UseTeamListHandlerReturn => {
  const [selectedTeams, setSelectedTeams] = React.useState<
    ChampionshipTeamInfo[]
  >([]);

  React.useEffect(() => {
    setValue(
      "teams",
      selectedTeams.map((team) => team.team_list_idx)
    );
  }, [selectedTeams, setValue]);

  const handleAddTeam = (team: ChampionshipTeamInfo) => {
    if (selectedTeams.length >= 2) return;
    if (!selectedTeams.find((t) => t.team_list_idx === team.team_list_idx)) {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleRemoveTeam = (team: ChampionshipTeamInfo) => {
    setSelectedTeams(
      selectedTeams.filter((t) => t.team_list_idx !== team.team_list_idx)
    );
  };
  return { selectedTeams, handleAddTeam, handleRemoveTeam };
};

export default useTeamListHandler;
