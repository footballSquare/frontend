import React from "react";
import { MatchParticipants } from "../../../../../3_Entity/Match/type";
const useWaitListApprove = (
  setMatchParticipants: React.Dispatch<React.SetStateAction<MatchParticipants>>
) => {
  const waitListApproveHandler = React.useCallback(
    (
      player: {
        player_list_idx: number;
        player_list_nickname: string;
        player_list_url: string;
      }, // 승인할 대기자
      matchPosition: number, // 포지션 넘버
      matchParticipants: {
        match_position_idx: number;
        player_list_idx: number;
        player_list_nickname: string;
        player_list_url: string;
      }[] // 현재 참가자(기 승인자) 목록
    ) => {
      const isPositionEmpty = !matchParticipants.some(
        (participant) => participant.match_position_idx === matchPosition
      );

      if (isPositionEmpty) {
        setMatchParticipants((prev) => ({
          match_participant: [
            ...prev.match_participant,
            {
              match_position_idx: matchPosition,
              player_list_idx: player.player_list_idx,
              player_list_nickname: player.player_list_nickname,
              player_list_url: player.player_list_url,
            },
          ],
        }));
      }
    },
    [setMatchParticipants]
  );

  return [waitListApproveHandler];
};

export default useWaitListApprove;
