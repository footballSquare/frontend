// src/4_Shared/context/CommunityContext.tsx
import React from "react";
import {
  useMyCommunityListIdx,
  useMyCommunityRoleIdx,
} from "../../../4_Shared/lib/useMyInfo";

const ChampionshipInfoContext =
  React.createContext<ChampionshipContextType | null>(null);

export const useChampionshipContext = (
  communityListIdx: number,
  championship_list_color: string
) => {
  const [communityRoleIdx] = useMyCommunityRoleIdx();
  const [myCommunityListIdx] = useMyCommunityListIdx();
  const isCommunityOperator =
    communityRoleIdx === 1 && myCommunityListIdx === communityListIdx;
  const isCommunityManager = communityRoleIdx === 0;

  const value = React.useMemo(
    () => ({
      championship_list_color,
      communityListIdx,
      isCommunityOperator,
      isCommunityManager,
    }),
    [
      championship_list_color,
      communityListIdx,
      isCommunityOperator,
      isCommunityManager,
    ]
  );

  return { value, ChampionshipInfoContext };
};

export const useChampionshipContextInfo = () => {
  const ctx = React.useContext(ChampionshipInfoContext);
  if (!ctx) {
    throw new Error("useChampionship must be used within ChampionshipProvider");
  }
  return ctx;
};
