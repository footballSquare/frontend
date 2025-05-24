import React from "react";
import usePutOpenMatchJoin from "../../../3_Entity/Match/usePutOpenMatchJoin";
import usePutTeamMatchJoin from "../../../3_Entity/Match/usePutTeamMatchJoin";
import { useMyTeamIdx } from "../../../4_Shared/lib/useMyInfo";

const useMatchApply = (
  props: UseMatchApplyProps
): [(props: MatchApplyHandlerProps) => void] => {
  const {
    setMatchWaitList,
    setMatchParticipants,
    isMatchLeader = false,
    isTeamMatch = false,
  } = props;
  const [putOpenMatchJoin] = usePutOpenMatchJoin();
  const [putTeamMatchJoin] = usePutTeamMatchJoin();
  const [myTeamIdx] = useMyTeamIdx();

  const matchApplyHandler = React.useCallback(
    async (props: MatchApplyHandlerProps): Promise<void> => {
      const { matchIdx, player, matchPosition, matchParticipationType } = props;
      let status;
      if (isTeamMatch && myTeamIdx) {
        status = await putTeamMatchJoin({
          matchIdx,
          matchPositionIdx: matchPosition,
          teamIdx: myTeamIdx,
        });
      } else {
        status = await putOpenMatchJoin({
          matchIdx,
          matchPositionIdx: matchPosition,
        });
      }

      if (typeof status === "number" && status === 200) {
        if (matchParticipationType === 0 && !isMatchLeader) {
          setMatchWaitList((prev: MatchWaitList) => ({
            match_waitlist: {
              ...prev.match_waitlist,
              [matchPosition]: [
                ...(prev.match_waitlist?.[matchPosition] ?? []).filter(
                  (waiter) => waiter.player_list_idx !== player.player_list_idx
                ), // 기존 대기자 목록이 있으면 추가하고 없으면 빈 배열로 시작
                {
                  player_list_idx: player.player_list_idx,
                  player_list_nickname: player.player_list_nickname,
                  player_list_url: player.player_list_url,
                  match_waitlist_created_at: new Date().toISOString(),
                },
              ],
            },
          }));
          alert("매치에 대기자로 등록되었습니다.");
        } else if (matchParticipationType === 1 || isMatchLeader) {
          // set MatchParticipants state
          setMatchParticipants((prev) => [
            ...prev,
            ...[
              {
                match_position_idx: matchPosition,
                player_list_idx: player.player_list_idx,
                player_list_nickname: player.player_list_nickname,
                player_list_url: player.player_list_url,
              },
            ],
          ]);
          alert("매치에 참가했습니다.");
        }
      }
    },
    [
      putOpenMatchJoin,
      isMatchLeader,
      setMatchParticipants,
      setMatchWaitList,
      putTeamMatchJoin,
      myTeamIdx,
      isTeamMatch
    ]
  );

  return [matchApplyHandler];
};

export default useMatchApply;
