import { MatchParticipant } from "../../../../3_Entity/Match/type";
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
    player: Pick<
      MatchParticipant,
      "player_list_idx" | "player_list_nickname" | "player_list_url"
    >,
    matchPosition: number,
    matchParticipants: MatchParticipant[]
  ) => void;
  matchApplyHandler: (
    player: Pick<
      MatchParticipant,
      "player_list_idx" | "player_list_nickname" | "player_list_url"
    >,
    matchPosition: number
  ) => void;
  isMatchLeader: boolean;
};
