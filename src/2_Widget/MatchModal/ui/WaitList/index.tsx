import React from "react";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { WaitingListProps } from "./type";
import applyBtn from "../../../../4_Shared/assets/svg/applyBtn.svg";

const WaitingList = (props: WaitingListProps) => {
  const [selectedPostion, setSelectedPosition] = React.useState<number>(0);
  const {
    match_formation_position,
    setMatchParticipants,
    matchParticipants,
    matchWaitList,
  } = props;
  return (
    <div>
      <select
        className=" w-[164px] h-[32px] rounded-[4px] text-center border-1 border-blue"
        onChange={(e) => setSelectedPosition(Number(e.target.value))}
      >
        {match_formation_position.map((position) => (
          <option key={position} value={position}>
            {matchPosition[position]}
          </option>
        ))}
      </select>

      {matchWaitList && (
        <div className="flex flex-col gap-2">
          {matchWaitList[selectedPostion]?.map((player) => (
            <div
              key={player.player_list_idx}
              className="flex gap-2 justify-around "
            >
              {/* <img src={player.player_list_url} alt="player" /> */}
              <p>{player.player_list_nickname}</p>
              <button
                onClick={() => {
                  setMatchParticipants((prev) => ({
                    ...prev, // 기존 객체 유지
                    match_participant: [
                      ...prev.match_participant,
                      {
                        match_position_idx: selectedPostion,
                        player_list_idx: player.player_list_idx,
                        player_list_nickname: player.player_list_nickname,
                        player_list_url: player.player_list_url,
                      },
                    ],
                  }));
                }}
              >
                <img src={applyBtn} alt="" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WaitingList;
