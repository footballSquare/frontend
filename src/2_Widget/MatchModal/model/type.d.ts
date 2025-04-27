type UseMatchApproveProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
  setMatchParticipants: React.Dispatch<
    React.SetStateAction<MatchParticipant[]>
  >;
};
type MatchApproveHandlerProps = {
  player: Pick<
    MatchParticipant,
    "player_list_idx" | "player_list_nickname" | "player_list_url"
  >; // 승인할 대기자
  matchPosition: number; // 포지션 넘버
  matchParticipants: MatchParticipant[];
  isFree: boolean;
};

type UseMatchApplyProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
};
type MatchApplyHandlerProps = {
  matchIdx: number;
  player: Pick<
    MatchParticipant,
    "player_list_idx" | "player_list_nickname" | "player_list_url"
  >;
  matchPosition: number;
};
