import React from "react";

const useManageSearchPlayer = (
  playerStats: PlayerStats[]
): [PlayerStats[], string, (value: string) => void] => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

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
  return [filteredPlayers, searchTerm, handleSearchTermChange];
};
export default useManageSearchPlayer;
