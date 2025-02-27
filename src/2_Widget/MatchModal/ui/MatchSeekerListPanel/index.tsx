import React from "react";
import WaitingPlayerList from "../../../WaitingPlayerList";
import up_icon from "../../../../4_Shared/assets/svg/up.svg";
import down_icon from "../../../../4_Shared/assets/svg/down.svg";
const MatchSeekerListPanel = () => {
  const [isMatchSeekerListPanel, setIsMatchSeekerListPanel] =
    React.useState(false);
  return (
    <div className=" absolute top-10 right-12 flex flex-col h-[calc(100%_-_96px)] w-[30%]">
      <div className=" flex justify-between items-center">
        <h4 className=" font-bold text-blue">매치 참여 희망 인원 현황</h4>
        {isMatchSeekerListPanel ? (
          <button
            onClick={() => setIsMatchSeekerListPanel(!isMatchSeekerListPanel)}
          >
            <img src={up_icon} alt="up" />
          </button>
        ) : (
          <button
            onClick={() => setIsMatchSeekerListPanel(!isMatchSeekerListPanel)}
          >
            <img src={down_icon} alt="down" />
          </button>
        )}
      </div>

      {isMatchSeekerListPanel && <WaitingPlayerList />}
    </div>
  );
};

export default MatchSeekerListPanel;
