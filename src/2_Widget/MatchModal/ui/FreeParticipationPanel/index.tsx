import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import {
  useMyNickname,
  useMyProfileImg,
  useMyUserIdx,
} from "../../../../4_Shared/lib/useMyInfo";
import useMatchModalStore from "../../../../4_Shared/zustand/useMatchModal";

const FreeParticipationPanel = (props :FreeParticipationPanelProps) => {
  const { matchPositions, matchParticipants, matchApplyHandler } = props;
  const [userIdx] = useMyUserIdx();
  const [nickname] = useMyNickname();
  const [profileImg] = useMyProfileImg();
  const { matchIdx } = useMatchModalStore();

  return (
    <div className=" flex flex-col gap-4 h-[300px] flex-wrap">
      {matchPositions.map((positionIdx, index) => {
        return (
          !matchParticipants.some(
            (elem) => elem.match_position_idx === positionIdx
          ) && (
            <button
              key={index}
              className=" border border-gray shadow-lg p-[2px] w-[128px] hover:bg-blue hover:scale-[1.2] duration-300 hover:text-white"
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
            >
              {matchPosition[positionIdx]}로 참가하기
            </button>
          )
        );
      })}
    </div>
  );
};
export default FreeParticipationPanel;
