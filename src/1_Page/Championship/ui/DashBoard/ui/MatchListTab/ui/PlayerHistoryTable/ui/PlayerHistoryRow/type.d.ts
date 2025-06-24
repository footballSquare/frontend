type PlayerHistoryRowProps = {
  player: PlayerStats;
  maxGoal: number;
  maxAssist: number;
  personEvidenceImage?: PlayerEvidenceImg[];
  handleUpdatePlayer: (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => void;
};
