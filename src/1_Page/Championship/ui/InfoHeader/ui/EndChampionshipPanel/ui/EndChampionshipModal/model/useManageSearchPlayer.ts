import React from "react";

const useManageSearchPlayer = (playerStats: EndPlayerStatas[]) => {
  // State hooks
  const [selectTeam, setSelectTeam] =
    React.useState<ChampionshipTeamInfo | null>(null);
  const [selectedPlayerAwards, setSelectedPlayerAwards] =
    React.useState<EndPlayerStatas | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Memoized filtered players using searchTerm from state
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

  // Return all necessary state and computed values
  return {
    filteredPlayers,
    selectTeam,
    setSelectTeam,
    selectedPlayerAwards,
    setSelectedPlayerAwards,
    searchTerm,
    setSearchTerm,
  };
};

export default useManageSearchPlayer;
