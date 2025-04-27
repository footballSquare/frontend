import React from "react";
import usePutOpenMatchJoin from "../../../3_Entity/Match/usePutOpenMatchJoin";
const useMatchApply = (
  props: UseMatchApplyProps
): [(props: MatchApplyHandlerProps) => void] => {
  const { setMatchWaitList } = props;
  const [putOpenMatchJoin, serverState, loading] = usePutOpenMatchJoin();
  const [player, setPlayer] =
    React.useState<
      Pick<
        MatchParticipant,
        "player_list_idx" | "player_list_nickname" | "player_list_url"
      >
    >();
  const [matchPosition, setMatchPosition] = React.useState<number>(-1);

  React.useEffect(() => {
    if (
      !loading &&
      serverState?.status === 200 &&
      player &&
      matchPosition !== -1
    ) {
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
            },
          ],
        },
      }));
    }
  }, [loading, serverState, player, matchPosition, setMatchWaitList]);

  const matchApplyHandler = React.useCallback(
    (props: MatchApplyHandlerProps): void => {
      const { matchIdx, player, matchPosition } = props;
      putOpenMatchJoin({
        matchIdx,
        matchPositionIdx: matchPosition,
      });
      setPlayer(player);
      setMatchPosition(matchPosition);
    },
    [putOpenMatchJoin, setPlayer, setMatchPosition]
  );

  return [matchApplyHandler];
};

export default useMatchApply;
