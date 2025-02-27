export type FormationPanelProps = {
  matchFormationIdx: number;
  matchWaitList: {
    [key: string]: {
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
    }[];
  } | null;
  matchParticipants: {
    player_list_idx: number;
    player_list_nickname: string;
    match_position_idx: number;
    player_list_url: string;
  }[];
};
