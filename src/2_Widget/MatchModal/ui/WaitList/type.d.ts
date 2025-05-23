type WaitingListProps = {
  matchFormationPosition: number[];
  matchParticipants: {
    match_position_idx: number;
    player_list_idx: number;
    player_list_nickname: string;
    player_list_url: string;
  }[];
  matchWaitList: Pick<MatchWaitList, "match_waitlist">["match_waitlist"] | null;
  matchApproveHandler: (props: MatchApproveHandlerProps) => void;
  matchApplyHandler: (props: MatchApplyHandlerProps) => void;
  isMatchLeader: boolean;
};
