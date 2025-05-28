import React from "react";

const useManagePlayers = (
  signMemberList: TeamSignMember[]
): [TeamSignMember[], (id: number) => void, (id: number) => void] => {
  const [excludedPlayerIds, setExcludedPlayerIds] = React.useState<number[]>(
    []
  );

  const excludePlayerById = (id: number) => {
    setExcludedPlayerIds((prev) => [...prev, id]);
  };

  const includePayerById = (id: number) => {
    setExcludedPlayerIds((prev) => prev.filter((playerId) => playerId !== id));
  };

  const pendingPlayers = signMemberList.filter(
    (player) => !excludedPlayerIds.includes(player.player_list_idx)
  );

  return [pendingPlayers, excludePlayerById, includePayerById];
};
export default useManagePlayers;
