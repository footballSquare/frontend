import React from "react";

const useManagePlayers = (
  signMemberList: TeamSignMember[]
): [TeamSignMember[], (num: number) => void] => {
  const disPlayPlayersRef = React.useRef<Array<number>>([]);

  const addToArray = (num: number) => {
    disPlayPlayersRef.current.push(num);
  };

  // 승인 또는 거절된 데이터 삭제
  const slicedPlayerList = signMemberList.filter(
    (player) => !disPlayPlayersRef.current.includes(player.player_list_idx)
  );
  return [slicedPlayerList, addToArray];
};
export default useManagePlayers;
