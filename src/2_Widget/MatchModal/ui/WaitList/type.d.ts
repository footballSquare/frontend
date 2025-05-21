import {
  MatchApplyHandlerProps,
  MatchApproveHandlerProps,
} from "../../model/type";
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
  matchApproveHandler: (props: MatchApproveHandlerProps) => void;
  matchApplyHandler: (props: MatchApplyHandlerProps) => void;
  isMatchLeader: boolean;
};
