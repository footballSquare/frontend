import React from "react";
const useAwardPlayers = (): UseAwardPlayersReturn => {
  const [selectedAwardPlayers, setSelectedAwardPlayers] = React.useState<
    (EndPlayerStatas | null)[]
  >([]);

  const handlePlayerSelectForAward = (
    awardIndex: number,
    player: EndPlayerStatas
  ) => {
    const newAwardPlayers = [...selectedAwardPlayers];
    newAwardPlayers[awardIndex] = player;
    setSelectedAwardPlayers(newAwardPlayers);
  };
  return { selectedAwardPlayers, handlePlayerSelectForAward };
};

export default useAwardPlayers;
