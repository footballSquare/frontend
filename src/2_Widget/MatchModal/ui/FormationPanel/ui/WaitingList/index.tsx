import React from "react";
import { matchPosition } from "../../../../../../4_Shared/constant/matchPosition";
import { WaitingListProps } from "./type";
import applyBtn from "../../../../../../4_Shared/assets/svg/applyBtn.svg";
const WaitingList = (props: WaitingListProps) => {
  const [selectedPostion, setSelectedPosition] = React.useState<number>(0);
  const { match_formation_position, match_waitlist } = props;
  console.log(match_waitlist);
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

      {match_waitlist && (
        <div className="flex flex-col gap-2">
          {match_waitlist[selectedPostion]?.map((player) => (
            <div
              key={player.player_list_idx}
              className="flex gap-2 justify-around "
            >
              {/* <img src={player.player_list_url} alt="player" /> */}
              <p>{player.player_list_nickname}</p>
              <button>
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
