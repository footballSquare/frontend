import React from "react";
import { MatchWaitList, MatchParticipant } from "../../../3_Entity/Match/types/response";

export type UseMatchApproveProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
  setMatchParticipants: React.Dispatch<
    React.SetStateAction<MatchParticipant[]>
  >;
};
export type MatchApproveHandlerProps = {
  player: Pick<
    MatchParticipant,
    "player_list_idx" | "player_list_nickname" | "player_list_url"
  >; // 승인할 대기자
  matchPosition: number; // 포지션 넘버
  matchParticipants: MatchParticipant[];
};

export type UseMatchApplyProps = {
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
};
export type MatchApplyHandlerProps = {
  player: Pick<
    MatchParticipant,
    "player_list_idx" | "player_list_nickname" | "player_list_url"
  >;
  matchPosition: number;
};
