import React from "react";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import {
  useMyNickname,
  useMyProfileImg,
  useMyUserIdx,
} from "../../../../4_Shared/lib/useMyInfo";
import useMatchModalStore from "../../../../4_Shared/zustand/useMatchModal";
import { formations } from "../../constant/formation";

const FreeParticipationPanel = React.memo(
  (props: FreeParticipationPanelProps) => {
    const {
      matchPositions,
      matchParticipants,
      matchApplyHandler,
      matchFormationIdx,
    } = props;
    const [userIdx] = useMyUserIdx();
    const [nickname] = useMyNickname();
    const [profileImg] = useMyProfileImg();
    const { matchIdx } = useMatchModalStore();

    return (
      <div className="relative w-full h-full">
        {matchPositions.map((positionIdx, index) => {
          return (
            !matchParticipants.some(
              (elem) => elem.match_position_idx === positionIdx
            ) && (
              <button
                key={index}
                className="absolute border border-gray shadow-lg px-2 h-[32px] rounded-lg bg-gray-500 hover:bg-gray-800 text-sm hover:scale-[1.2] duration-300 hover:text-white"
                onClick={() => {
                  matchApplyHandler({
                    matchIdx,
                    player: {
                      player_list_nickname: nickname || "",
                      player_list_idx: userIdx || -1,
                      player_list_url: profileImg || "",
                    },
                    matchPosition: positionIdx,
                    matchParticipationType: 1,
                  });
                }}
                style={{
                  top: formations[matchFormationIdx].find(
                    (pos) => pos.positionIdx === positionIdx
                  )?.top,
                  left: formations[matchFormationIdx].find(
                    (pos) => pos.positionIdx === positionIdx
                  )?.left,
                }}
              >
                {matchPosition[positionIdx]}에 참가
              </button>
            )
          );
        })}
      </div>
    );
  }
);
export default FreeParticipationPanel;
