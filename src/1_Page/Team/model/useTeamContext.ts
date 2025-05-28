// src/4_Shared/context/CommunityContext.tsx
import React from "react";

const TeamInfoContext = React.createContext<TeamInfoContextType | null>(null);

export const useTeamInfoContext = (team_list_color: string) => {
  const value = React.useMemo(
    () => ({
      team_list_color,
    }),
    [team_list_color]
  );

  return { value, TeamInfoContext };
};

export const useTeamInfo = () => {
  const ctx = React.useContext(TeamInfoContext);
  if (!ctx) {
    throw new Error("useChampionship must be used within ChampionshipProvider");
  }
  return ctx;
};
