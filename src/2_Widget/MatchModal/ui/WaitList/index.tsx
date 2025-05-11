import React from "react";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { WaitingListProps } from "./type";
import {
  useMyNickname,
  useMyProfileImg,
  useMyUserIdx,
} from "../../../../4_Shared/lib/useMyInfo";
import useMatchModalStore from "../../../../4_Shared/zustand/useMatchModal";

const WaitingList = React.memo((props: WaitingListProps) => {
  const [selectedPosition, setSelectedPosition] = React.useState<number>(0);
  const {
    matchFormationPosition,
    matchParticipants,
    matchWaitList,
    matchApproveHandler,
    matchApplyHandler,
    isMatchLeader,
  } = props;

  const [userIdx] = useMyUserIdx();
  const [nickName] = useMyNickname();
  const [profileUrl] = useMyProfileImg();
  const { matchIdx } = useMatchModalStore();

  return (
    <div className=" w-[60%]">
      {/* 포지션 select & option 태그, 포지션 명 & 각 지원자 수 표시 */}
      <select
        className="w-[164px] h-[32px] rounded-[4px] text-center border-1 bg-gray-500 border-gray text-black cursor-pointer"
        onChange={(e) => setSelectedPosition(Number(e.target.value))}
      >
        {matchFormationPosition.map((position) => (
          <option
            key={position}
            value={position}
            className="flex w-full justify-between"
          >
            {`${matchPosition[position]} | ${
              matchWaitList && (matchWaitList[position]?.length || 0)
            } 명 지원`}
          </option>
        ))}
      </select>

      {/* 선택된 포지션 별 대기자 명단 & 참여 승인 버튼 */}
      {matchWaitList && (
        <div className="flex flex-col gap-2 mt-4 flex-wrap h-full w-full max-w-[280px]">
          {matchWaitList[selectedPosition]?.map((player) => (
            <div
              key={player.player_list_idx}
              className="flex gap-2 justify-between p-2 border-1 border-gray rounded-lg shadow-lg"
            >
              {/* <img src={player.player_list_url} alt="player" /> */}
              <span>{player.player_list_nickname}</span>
              {isMatchLeader && (
                <button
                  onClick={() =>
                    matchApproveHandler({
                      player,
                      matchPosition: selectedPosition,
                      matchParticipants,
                    })
                  }
                  className="text-white text-lg"
                >
                  ✓
                </button>
              )}
            </div>
          ))}

          <button
            className=" border-1 rounded-lg border-gray shadow-lg bg-gray-500 hover:bg-light-blue text-black duration-700"
            onClick={() => {
              matchApplyHandler({
                matchIdx,
                player: {
                  player_list_idx: userIdx,
                  player_list_nickname: nickName,
                  player_list_url: profileUrl,
                },
                matchPosition: selectedPosition,
                matchParticipationType: 0, // 대기자 목록(WaitingList)는 항상 승인참여
              });
            }}
          >
            {matchPosition[selectedPosition]} 지원하기
          </button>
        </div>
      )}
    </div>
  );
});

export default WaitingList;
