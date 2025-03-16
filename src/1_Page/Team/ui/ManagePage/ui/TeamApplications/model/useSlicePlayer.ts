import React from "react";
import { TeamSignMember } from "../../../../../../../3_Entity/Team/types/response";

const useSlicePlayer = (
  signMemberList: TeamSignMember[]
): [TeamSignMember[], (num: number) => void] => {
  const sliceUserRef = React.useRef<Array<number>>([]);

  const addToArray = (num: number) => {
    sliceUserRef.current.push(num);
  };

  // 승인 또는 거절된 데이터 삭제
  const slicedPlayerList = signMemberList.filter(
    (player) => !sliceUserRef.current.includes(player.player_list_idx)
  );
  return [slicedPlayerList, addToArray];
};
export default useSlicePlayer;
