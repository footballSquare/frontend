import React from "react";
import { SignTeamMember } from "../../../../../../../3_Entity/Team/type";

const useSlicePlayer = (
  signMemberList: SignTeamMember[]
): [SignTeamMember[], (num: number) => void] => {
  const sliceUserRef = React.useRef<Array<number>>([]);
  const addToArray = (num: number) => {
    sliceUserRef.current.push(num);
  };
  const slicedPlayerList = signMemberList.filter(
    (player) => !sliceUserRef.current.includes(player.player_list_idx)
  );
  return [slicedPlayerList, addToArray];
};
export default useSlicePlayer;
