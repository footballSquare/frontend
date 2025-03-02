import { MatchParticipants } from "../../../../3_Entity/Match/type";
export type WaitingListProps = {
  matchFormationPosition: number[];
  matchParticipants: {
    match_position_idx: number;
    player_list_idx: number;
    player_list_nickname: string;
    player_list_url: string;
  }[];
  matchWaitList: {
    [key: string]: {
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
    }[];
  } | null;
  matchApproveHandler: (
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
};
