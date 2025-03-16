import React from "react";
import { MatchApplyHandlerProps, UseMatchApplyProps } from "./type";
const useMatchApply = (
  props: UseMatchApplyProps
): [(props: MatchApplyHandlerProps) => void] => {
  const { setMatchWaitList } = props;

  const matchApplyHandler = React.useCallback(
    (props: MatchApplyHandlerProps): void => {
      const { player, matchPosition } = props;
      setMatchWaitList((prev) => ({
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
            },
          ],
        },
      }));
    },
    [setMatchWaitList]
  );

  return [matchApplyHandler];
};

export default useMatchApply;
