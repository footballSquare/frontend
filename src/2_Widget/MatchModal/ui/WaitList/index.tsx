import React from "react";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { WaitingListProps } from "./type";
import applyBtn from "../../../../4_Shared/assets/svg/applyBtn.svg";
import useWaitListApprove from "./model/useWaitListApprove";
import STYLE from "./style";

const WaitingList = (props: WaitingListProps) => {
  const [selectedPosition, setSelectedPosition] = React.useState<number>(0);
  const {
    matchFormationPosition,
    setMatchParticipants,
    matchParticipants,
    matchWaitList,
  } = props;

  const [waitListApproveHandler] = useWaitListApprove(setMatchParticipants);

  return (
    <div>
      {/* 포지션 select & option 태그, 포지션 명 & 각 지원자 수 표시 */}
      <select
        className={STYLE.positionSelect}
        onChange={(e) => setSelectedPosition(Number(e.target.value))}
      >
        {matchFormationPosition.map((position) => (
          <option
            key={position}
            value={position}
            className={STYLE.positionOption}
          >
            {`${matchPosition[position]} | ${
              matchWaitList && matchWaitList[position]?.length
            } 명 지원`}
          </option>
        ))}
      </select>

      {/* 선택된 포지션 별 대기자 명단 & 참여 승인 버튼 */}
      {matchWaitList && (
        <div className={STYLE.waitListContainer}>
          {matchWaitList[selectedPosition]?.map((player) => (
            <div
              key={player.player_list_idx}
              className={STYLE.waitList}
            >
              {/* <img src={player.player_list_url} alt="player" /> */}
              <p>{player.player_list_nickname}</p>
              <button
                onClick={() =>
                  waitListApproveHandler(
                    player,
                    selectedPosition,
                    matchParticipants
                  )
                }
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