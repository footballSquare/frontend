import React from "react";
import usePostMatchApproval from "../../../3_Entity/Match/usePostMatchApproval";
import useDeleteMatchApproval from "../../../3_Entity/Match/useDeleteMatchApproval";
import { UseMatchApproveProps, MatchApproveHandlerProps } from "./type";

const useMatchApprove = (
  props: UseMatchApproveProps
): [
  (props: MatchApproveHandlerProps) => void,
  (props: MatchApproveHandlerProps) => void
] => {
  const { setMatchParticipants, setMatchWaitList } = props;
  const [postMatchApproval] = usePostMatchApproval();
  const [deleteMatchApproval] = useDeleteMatchApproval();

  const matchApproveHandler = React.useCallback(
    (props: MatchApproveHandlerProps): void => {
      const { player, matchPosition, matchParticipants } = props;
      console.log(matchParticipants);
      if (
        // 포지션이 비어 있는 지 체크
        !matchParticipants.some(
          (participant) => participant.match_position_idx === matchPosition
        ) &&
        // 승인하려는 유저가 이미 참여된 상태인 지 체크
        !matchParticipants.some(
          (participant) =>
            participant.player_list_idx === player.player_list_idx
        )
      ) {
        // post api
        postMatchApproval(player.player_list_idx);
        // set MatchParticipants state
        setMatchParticipants((prev) => ({
          match_participant: [
            ...prev.match_participant,
            ...(matchParticipants.some(
              (participant) =>
                participant.player_list_idx === player.player_list_idx
            )
              ? []
              : [
                  {
                    match_position_idx: matchPosition,
                    player_list_idx: player.player_list_idx,
                    player_list_nickname: player.player_list_nickname,
                    player_list_url: player.player_list_url,
                  },
                ]),
          ],
        }));
        // set MatchWaitList state
        setMatchWaitList((prev) => ({
          match_waitlist: {
            ...prev.match_waitlist,
            [matchPosition]: (
              prev.match_waitlist?.[matchPosition] ?? []
            ).filter(
              (waiter) => waiter.player_list_idx !== player.player_list_idx
            ),
          },
        }));
      } else {
        alert("참여자가 존재하는 포지션이거나, 이미 참여 확정된 유저 입니다.");
      }
      console.log(matchParticipants);
    },
    [setMatchParticipants, setMatchWaitList, postMatchApproval]
  );

  const matchDisApproveHandler = React.useCallback(
    (props: MatchApproveHandlerProps): void => {
      const { player, matchPosition, matchParticipants } = props;

      if (
        // 해당 포지션에 참가 확정 된 유저가 있는 지 체크
        matchParticipants.some(
          (participant) => participant.match_position_idx === matchPosition
        ) &&
        // 참여상태인 유저가 맞는 지 체크
        matchParticipants.some(
          (participant) =>
            participant.player_list_idx === player.player_list_idx
        )
      ) {
        // delete api
        deleteMatchApproval(player.player_list_idx);
        // set MatchParticipants state
        setMatchParticipants((prev) => ({
          match_participant: [
            ...prev.match_participant.filter(
              (participant) =>
                participant.player_list_idx !== player.player_list_idx
            ),
          ],
        }));
        // set MatchWaitList state
        setMatchWaitList((prev) => ({
          match_waitlist: {
            ...prev.match_waitlist,
            [matchPosition]: [
              ...(prev.match_waitlist?.[matchPosition] ?? []),
              {
                player_list_idx: player.player_list_idx,
                player_list_nickname: player.player_list_nickname,
                player_list_url: player.player_list_url,
              },
            ],
          },
        }));
      }
    },
    [setMatchParticipants, setMatchWaitList, deleteMatchApproval]
  );

  return [matchApproveHandler, matchDisApproveHandler];
};

export default useMatchApprove;
