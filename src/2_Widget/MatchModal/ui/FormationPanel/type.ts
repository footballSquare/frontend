export type FormationPanelProps = {
  matchFormationIdx: number;
  matchParticipants: {
    player_list_idx: number;
    player_list_nickname: string;
    match_position_idx: number;
    player_list_url: string;
  }[];
  matchDisApproveHandler: (
    player: {
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
    },
    matchPosition: number,
    matchParticipants: {
      match_position_idx: number;
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
    }[]
  ) => void;
  isMatchLeader: boolean;
};
