type FreeParticipationPanelProps = {
  matchPositions: number[];
  matchParticipants: {
    match_position_idx: number;
    player_list_nickname: string;
    player_list_url: string;
  }[];
  matchApplyHandler: ({
    matchIdx,
    player,
    matchPosition,
    matchParticipationType,
  }: {
    matchIdx: number;
    player: {
      player_list_nickname: string;
      player_list_idx: number;
      player_list_url: string;
    };
    matchPosition: number;
    matchParticipationType: number;
  }) => void;
}