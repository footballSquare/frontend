import React from "react";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { WaitingListProps } from "./type";
import applyBtn from "../../../../4_Shared/assets/svg/applyBtn.svg";

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
  const [myInfo,] = React.useState({
    userIdx: 1,
    nickName: "master",
    profileUrl: "testing...",
  });
  
  return (
    <div className=" w-[60%]">
      {/* 포지션 select & option 태그, 포지션 명 & 각 지원자 수 표시 */}
      <select
        className="w-[164px] h-[32px] rounded-[4px] text-center border-1 border-blue"
        onChange={(e) => setSelectedPosition(Number(e.target.value))}
      >
        {matchFormationPosition.map((position) => (
          <option
            key={position}
            value={position}
            className="flex w-full justify-between"
          >
            {`${matchPosition[position]} | ${
              matchWaitList && matchWaitList[position]?.length
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
              className="flex gap-2 justify-between p-2 border-1 border-gray rounded-lg bg-light-blue shadow-lg"
            >
              {/* <img src={player.player_list_url} alt="player" /> */}
              <p>{player.player_list_nickname}</p>
              {isMatchLeader && (
                <button
                  onClick={() =>
                    matchApproveHandler(
                      player,
                      selectedPosition,
                      matchParticipants
                    )
                  }
                >
                  <img className=" w-[24px]" src={applyBtn} alt="" />
                </button>
              )}
            </div>
          ))}

          <button
            className=" border-1 rounded-lg border-gray shadow-lg bg-blue text-white hover:bg-light-blue hover:text-black duration-700"
            onClick={() => {
              matchApplyHandler(
                {
                  player_list_idx: myInfo.userIdx,
                  player_list_nickname: myInfo.nickName,
                  player_list_url: myInfo.profileUrl,
                },
                selectedPosition
              );
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
