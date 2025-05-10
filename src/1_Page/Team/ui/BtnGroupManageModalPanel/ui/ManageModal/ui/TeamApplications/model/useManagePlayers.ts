import React from "react";

const useManagePlayers = (
  signMemberList: TeamSignMember[]
): [TeamSignMember[], (id: number) => void] => {
  const [excludedPlayerIds, setExcludedPlayerIds] = React.useState<number[]>(
    []
  );

  const excludePlayerById = (id: number) => {
    setExcludedPlayerIds((prev) => [...prev, id]);
  };

  const pendingPlayers = signMemberList.filter(
    (player) => !excludedPlayerIds.includes(player.player_list_idx)
  );

  return [pendingPlayers, excludePlayerById];
};
export default useManagePlayers;
