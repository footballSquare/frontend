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
  matchParticipants: MatchParticipant[]; // 현재 참가자 목록
  isFree?: boolean;
};
type MatchDisApproveHandlerProps = {
  player: MatchWaiter; // 거절할 대기자
  matchPosition: number; // 포지션 넘버
  isFree?: boolean;
};

type UseMatchApplyProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
  setMatchParticipants: React.Dispatch<
    React.SetStateAction<MatchParticipant[]>
  >;
  isMatchLeader?: boolean;
  isTeamMatch?: boolean;
};
type MatchApplyHandlerProps = {
  matchIdx: number;
  player: Pick<
    MatchParticipant,
    "player_list_idx" | "player_list_nickname" | "player_list_url"
  >;
  matchPosition: number;
  matchParticipationType: number;
};

type UseMatchEndProps = {
  setMatchDetail: (value: React.SetStateAction<MatchDetail>) => void;
};

type MatchEndHandlerProps = {
  matchIdx: number;
};

type CancelMatchApplyHandlerProps = {
  userIdx: number;
  matchPosition: number;
};

type UseCancelMatchApplyProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
};
