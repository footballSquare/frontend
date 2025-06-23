type PlayerHistoryTableProps = {
  players: PlayerStats[];
  teamLabel: string;
  maxGoal: number;
  maxAssist: number;
  personEvidenceImage?: PlayerEvidenceImg[];
  handleUpdatePlayer: (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => void;
};
