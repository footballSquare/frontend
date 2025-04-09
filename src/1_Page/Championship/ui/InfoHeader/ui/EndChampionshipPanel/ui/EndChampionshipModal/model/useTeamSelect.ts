import React from "react";

const useTeamSelect = (): UseTeamSelectReturn => {
  const [selectTeam, setSelectTeam] = React.useState<EndTeamInfo | null>(null);
  const handleSetSelectTeam = (team: EndTeamInfo) => {
    if (selectTeam?.team_list_idx === team.team_list_idx) {
      setSelectTeam(null);
    } else {
      setSelectTeam(team);
    }
  };
  return { selectTeam, handleSetSelectTeam };
};

export default useTeamSelect;
