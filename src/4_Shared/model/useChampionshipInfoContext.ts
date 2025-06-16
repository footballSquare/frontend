import React from "react";

type ChampionshipContextType = {
  championshipListColor: string;
  communityListIdx: number;
  isCommunityOperator: boolean;
  isCommunityManager: boolean;
};

export const ChampionshipInfoContext =
  React.createContext<ChampionshipContextType | null>(null);

const useChampionshipInfoContext = () => {
  const ctx = React.useContext(ChampionshipInfoContext);
  if (!ctx) {
    throw new Error("useChampionship must be used within ChampionshipProvider");
  }
  return ctx;
};

export default useChampionshipInfoContext;
