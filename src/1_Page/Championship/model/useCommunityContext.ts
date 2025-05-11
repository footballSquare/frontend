// src/4_Shared/context/CommunityContext.tsx
import React from "react";
import {
  useMyCommunityListIdx,
  useMyCommunityRoleIdx,
} from "../../../4_Shared/lib/useMyInfo";

type CommunityContextType = {
  communityListIdx: number;
  isCommunityOperator: boolean;
  isCommunityManager: boolean;
};
const CommunityContext = React.createContext<CommunityContextType | null>(null);

export const useCommunityContext = (communityListIdx: number) => {
  const [communityRoleIdx] = useMyCommunityRoleIdx();
  const [myCommunityListIdx] = useMyCommunityListIdx();
  const isCommunityOperator =
    communityRoleIdx === 1 && myCommunityListIdx === communityListIdx;
  const isCommunityManager = communityRoleIdx === 0;

  const value = React.useMemo(
    () => ({ communityListIdx, isCommunityOperator, isCommunityManager }),
    [communityListIdx, isCommunityOperator, isCommunityManager]
  );

  return { value, CommunityContext };
};

export const useCommunityRole = () => {
  const ctx = React.useContext(CommunityContext);
  if (!ctx) {
    throw new Error("useCommunity must be used within CommunityProvider");
  }
  return ctx;
};
