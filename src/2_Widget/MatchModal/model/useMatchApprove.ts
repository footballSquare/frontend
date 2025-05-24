import React from "react";
import usePostMatchApproval from "../../../3_Entity/Match/usePostMatchApproval";
import useMatchModalStore from "../../../4_Shared/zustand/useMatchModal";
import useDeleteMatchJoin from "../../../3_Entity/Match/useDeleteMatchJoin";
import { useMyUserIdx } from "../../../4_Shared/lib/useMyInfo";

const useMatchApprove = (
  props: UseMatchApproveProps
): [
  (props: MatchApproveHandlerProps) => void,
  (props: MatchDisApproveHandlerProps) => void
] => {
  const { setMatchParticipants, setMatchWaitList } = props;
  const [postMatchApproval] = usePostMatchApproval();
  const { matchIdx } = useMatchModalStore();
  const [deleteMatchJoin] = useDeleteMatchJoin();
  const [myUserIdx] = useMyUserIdx();

  const matchApproveHandler = React.useCallback(
    (props: MatchApproveHandlerProps): void => {
      const { player, matchPosition, matchParticipants, isFree } = props;
      // post api
      postMatchApproval({
        matchIdx,
        userIdx: player.player_list_idx,
        matchPositionIdx: matchPosition,
      });
      // set MatchParticipants state
      setMatchParticipants((prev) => [
        ...prev,
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
      ]);
      // set MatchWaitList state
      if (!isFree) {
        setMatchWaitList((prev: MatchWaitList) => ({
          match_waitlist: {
            ...prev.match_waitlist,
            [matchPosition]: (
              prev.match_waitlist?.[matchPosition] ?? []
            ).filter(
              (waiter) => waiter.player_list_idx !== player.player_list_idx
            ),
          },
        }));
      }
    },
    [setMatchParticipants, setMatchWaitList, postMatchApproval, matchIdx]
  );

  const matchDisApproveHandler = React.useCallback(
    async (props: MatchDisApproveHandlerProps): Promise<void> => {
      const { player, matchPosition, isFree } = props;

      // delete api
      const status = await deleteMatchJoin({
        matchIdx,
        userIdx: player.player_list_idx,
      });

      if (typeof status === "number" && status === 200) {
        // set MatchParticipants state
        setMatchParticipants((prev) =>
          prev.filter(
            (participant) =>
              participant.player_list_idx !== player.player_list_idx
          )
        );
        if (!isFree && myUserIdx !== player.player_list_idx) {
          setMatchWaitList((prev) => ({
            match_waitlist: {
              ...prev.match_waitlist,
              [matchPosition]: [
                ...(prev.match_waitlist?.[matchPosition] ?? []),
                {
                  player_list_idx: player.player_list_idx,
                  player_list_nickname: player.player_list_nickname,
                  player_list_url: player.player_list_url,
                  match_waitlist_created_at: player.match_waitlist_created_at,
                },
              ],
            },
          }));
        }
      }
    },
    [
      setMatchParticipants,
      matchIdx,
      deleteMatchJoin,
      setMatchWaitList,
      myUserIdx,
    ]
  );

  return [matchApproveHandler, matchDisApproveHandler];
};

export default useMatchApprove;
