import React from "react";
import {
  MatchWaitList,
  MatchParticipants,
  MatchParticipant,
} from "../../../3_Entity/Match/type";
const useMatchApprove = (
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>,
  setMatchParticipants: React.Dispatch<React.SetStateAction<MatchParticipants>>
): [
  (
    player: Pick<
      MatchParticipant,
      "player_list_idx" | "player_list_nickname" | "player_list_url"
    >,
    matchPosition: number,
    matchParticipants: MatchParticipant[]
  ) => void,
  (
    player: Pick<
      MatchParticipant,
      "player_list_idx" | "player_list_nickname" | "player_list_url"
    >,
    matchPosition: number,
    matchParticipants: MatchParticipant[]
  ) => void
] => {
  const matchApproveHandler = React.useCallback(
    (
      player: Pick<
        MatchParticipant,
        "player_list_idx" | "player_list_nickname" | "player_list_url"
      >, // 승인할 대기자
      matchPosition: number, // 포지션 넘버
      matchParticipants: MatchParticipant[] // 현재 참가자(기 승인자) 목록
    ) => {
      const isPositionEmpty = !matchParticipants.some(
        (participant) => participant.match_position_idx === matchPosition
      );
      // 참가자 리스트에 추가, 대기자 리스트에서 제거
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

        setMatchWaitList((prev) => ({
          match_waitlist: {
            ...prev.match_waitlist,
            [matchPosition]: (
              prev.match_waitlist?.[matchPosition] ?? []
            ).filter(
              (waiter) => waiter.player_list_idx !== player.player_list_idx
            ),
          },
        })); // 대기자 리스트에서 제거
      }
    },
    [setMatchParticipants, setMatchWaitList]
  );

  const matchDisApproveHandler = React.useCallback(
    (
      player: Pick<
        MatchParticipant,
        "player_list_idx" | "player_list_nickname" | "player_list_url"
      >, // 승인 취소할 유저
      matchPosition: number, // 포지션 넘버
      matchParticipants: MatchParticipant[] // 현재 참가자(기 승인자) 목록
    ) => {
      const isPositionEmpty = !matchParticipants.some(
        (participant) => participant.match_position_idx === matchPosition
      );
      // 참가자 리스트에서 제거, 대기자 리스트에 추가
      if (!isPositionEmpty) {
        setMatchParticipants((prev) => ({
          match_participant: [
            ...prev.match_participant.filter(
              (participant) =>
                participant.player_list_idx !== player.player_list_idx
            ),
          ],
        }));

        setMatchWaitList((prev) => ({
          match_waitlist: {
            ...prev.match_waitlist,
            [matchPosition]: [
              ...(prev.match_waitlist?.[matchPosition] ?? []), // 기존 대기자 목록이 있으면 추가하고 없으면 빈 배열로 시작
              {
                player_list_idx: player.player_list_idx,
                player_list_nickname: player.player_list_nickname,
                player_list_url: player.player_list_url,
              },
            ],
          },
        })); // 대기자 리스트에서 제거
      }
    },
    [setMatchParticipants, setMatchWaitList]
  );
  return [matchApproveHandler, matchDisApproveHandler];
};

export default useMatchApprove;
