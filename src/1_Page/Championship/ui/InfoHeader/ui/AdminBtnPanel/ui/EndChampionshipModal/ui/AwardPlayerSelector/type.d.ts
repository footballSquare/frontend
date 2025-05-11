type AwardPlayerSelectorProps = {
  award: EndAwards;
  players: EndPlayerStatas[];
  index: number;
  selectedAwardPlayers: (EndPlayerStatas | null)[];
  handlePlayerSelectForAward: (
    awardIndex: number,
    player: EndPlayerStatas
  ) => void;
};
