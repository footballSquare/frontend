export type WaitingListProps = {
  match_formation_position: number[];
  match_waitlist: {
    [key: string]: {
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
    }[];
  } | null;
};
