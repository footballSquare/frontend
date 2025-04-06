import React from "react";

const useManageSearchPlayer = (
  playerStats: PlayerStats[],
  searchTerm: string
): PlayerStats[] => {
  const filteredPlayers = React.useMemo(() => {
    if (playerStats && playerStats.length > 0) {
      return searchTerm
        ? playerStats.filter((player) =>
            player.player_list_nickname
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        : playerStats;
    }
    return [];
  }, [searchTerm, playerStats]);
  return filteredPlayers;
};
export default useManageSearchPlayer;
