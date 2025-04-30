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
};
type MatchApplyHandlerProps = {
  matchIdx: number;
  player: Player;
  matchPosition: number;
  matchParticipationType: number;
};
