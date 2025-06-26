import React from "react";

type TeamInfoContextType = {
  teamListColor: string;
};

export const TeamInfoContext = React.createContext<TeamInfoContextType | null>(
  null
);

const useTeamInfoContext = () => {
  const ctx = React.useContext(TeamInfoContext);
  if (!ctx) {
    throw new Error("useChampionship must be used within ChampionshipProvider");
  }
  return ctx;
};

export default useTeamInfoContext;
