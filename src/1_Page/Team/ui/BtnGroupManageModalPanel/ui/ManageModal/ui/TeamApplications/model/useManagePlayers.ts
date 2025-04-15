import React from "react";

const useManagePlayers = (
  signMemberList: TeamSignMember[]
): [TeamSignMember[], (num: number) => void] => {
  const [displayPlayers, setDisplayPlayers] = React.useState<number[]>([]);

  const addDisplayPlayer = (num: number) => {
    setDisplayPlayers((prev) => [...prev, num]);
  };

  // 승인 또는 거절된 데이터 삭제
  const slicedPlayerList = signMemberList.filter(
    (player) => !displayPlayers.includes(player.player_list_idx)
  );
  return [slicedPlayerList, addDisplayPlayer];
};
export default useManagePlayers;
