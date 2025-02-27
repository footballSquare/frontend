import { MatchParticipants } from "../../../../3_Entity/Match/type";
export type WaitingListProps = {
  match_formation_position: number[];
  matchParticipants: {
    match_position_idx: number;
    player_list_idx: number;
    player_list_nickname: string;
    player_list_url: string;
  }[];
  setMatchParticipants: React.Dispatch<React.SetStateAction<MatchParticipants>>;
  matchWaitList: {
    [key: string]: {
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
    }[];
  } | null;
};
