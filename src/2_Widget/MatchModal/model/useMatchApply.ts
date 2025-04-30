import React from "react";
import usePutOpenMatchJoin from "../../../3_Entity/Match/usePutOpenMatchJoin";

const useMatchApply = (
  props: UseMatchApplyProps
): [(props: MatchApplyHandlerProps) => void] => {
  const { setMatchWaitList, setMatchParticipants } = props;
  const [putOpenMatchJoin, serverState, loading] = usePutOpenMatchJoin();
  const [player, setPlayer] = React.useState<Player>();
  const [matchPosition, setMatchPosition] = React.useState<number>(-1);
  const [matchParticipationType, setMatchParticipationType] =
    React.useState<number>(-1);

  React.useEffect(() => {
    if (
      !loading &&
      serverState?.status === 200 &&
      player &&
      matchPosition !== -1
    ) {
      if (matchParticipationType === 0) {
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
        alert("매치에 대기자로 등록되었습니다.");
      } else if (matchParticipationType === 1) {
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
    } else if (serverState?.status === 403) {
      alert("같은 시간에 참가중인 매치가 존재합니다.");
    }
  }, [
    loading,
    serverState,
    player,
    matchPosition,
    setMatchWaitList,
    matchParticipationType,
    setMatchParticipants,
  ]);

  const matchApplyHandler = React.useCallback(
    (props: MatchApplyHandlerProps): void => {
      const { matchIdx, player, matchPosition, matchParticipationType } = props;
      putOpenMatchJoin({
        matchIdx,
        matchPositionIdx: matchPosition,
      });
      setPlayer(player);
      setMatchPosition(matchPosition);
      setMatchParticipationType(matchParticipationType);
    },
    [putOpenMatchJoin, setPlayer, setMatchPosition]
  );

  return [matchApplyHandler];
};

export default useMatchApply;
