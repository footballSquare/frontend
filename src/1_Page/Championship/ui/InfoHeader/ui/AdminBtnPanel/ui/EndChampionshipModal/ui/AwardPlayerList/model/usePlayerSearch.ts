import React from "react";

const usePlayerSearch = (players: EndPlayerStatas[]) => {
  const [playerSearchTerm, setPlayerSearchTerm] = React.useState<string>("");
  const filteredPlayers = React.useMemo(() => {
    if (!playerSearchTerm) return players;
    return players.filter((player) =>
      player.player_list_nickname
        .toLowerCase()
        .includes(playerSearchTerm.toLowerCase())
    );
  }, [players, playerSearchTerm]);
  const handleSetPlayerSearchTerm = (term: string) => {
    setPlayerSearchTerm(term);
  };
  return { playerSearchTerm, filteredPlayers, handleSetPlayerSearchTerm };
};

export default usePlayerSearch;
