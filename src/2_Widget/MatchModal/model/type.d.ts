type UseMatchApproveProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
  setMatchParticipants: React.Dispatch<
    React.SetStateAction<MatchParticipant[]>
  >;
};

type Player = {
  player_list_idx: number;
  player_list_nickname: string;
  player_list_url: string;
};

type MatchApproveHandlerProps = {
  player: Player; // 승인할 대기자
  matchPosition: number; // 포지션 넘버
  matchParticipants: MatchParticipant[];
  isFree: boolean;
};

type UseMatchApplyProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
  setMatchParticipants: React.Dispatch<
    React.SetStateAction<MatchParticipant[]>
  >;
  isMatchLeader?: boolean;
};
type MatchApplyHandlerProps = {
  matchIdx: number;
  player: Player;
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
