import React from "react";
import WaitingPlayerList from "../../../WaitingPlayerList";
import up_icon from "../../../../4_Shared/assets/svg/up.svg";
import down_icon from "../../../../4_Shared/assets/svg/down.svg";
const WaitingPlayerListPanel = () => {
  const [isWaitingPlayerListOpen, setIsWaitingPlayerListOpen] =
    React.useState(false);
  return (
    <div className=" absolute top-12 right-6 flex flex-col w-[30%]">
      <div className=" flex justify-between items-center">
        <h4 className=" font-bold text-blue">매치 참여 희망 인원 현황</h4>
        {isWaitingPlayerListOpen ? (
          <button onClick={() => setIsWaitingPlayerListOpen(!isWaitingPlayerListOpen)}>
            <img src={up_icon} alt="up" />
          </button>
        ) : (
          <button onClick={() => setIsWaitingPlayerListOpen(!isWaitingPlayerListOpen)}>
            <img src={down_icon} alt="down" />
          </button>
        )}
      </div>

      {isWaitingPlayerListOpen && <WaitingPlayerList />}
    </div>
  );
};

export default WaitingPlayerListPanel;
