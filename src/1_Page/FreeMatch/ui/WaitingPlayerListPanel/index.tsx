import React from "react";
import Button from "../../../../4_Shared/components/Button";
import WaitingPlayerList from "../../../../2_Widget/WaitingPlayerList";
import footballPlayer from "../../../../4_Shared/assets/svg/footballPlayer.svg";
const WaitingPlayerListPanel = () => {
  const [isWatingPlayerListOpen, setIsWaitingPlayerListOpen] =
    React.useState(false);

  return (
    <div className=" flex flex-col gap-4 w-[50%] h-[80vh] overflow-y-auto">
      {/* Button Wrapper */}
      <div className="w-[70%]">
        {isWatingPlayerListOpen ? (
          <Button
            text="매치 대기 인원 보기"
            bg="white"
            textColor="blue"
            bold={true}
            onClickHandler={() => {
              setIsWaitingPlayerListOpen(!isWatingPlayerListOpen);
            }}
          />
        ) : (
          <Button
            text="매치 대기 인원 보기"
            bg="blue"
            textColor="white"
            bold={true}
            onClickHandler={() => {
              setIsWaitingPlayerListOpen(!isWatingPlayerListOpen);
            }}
          />
        )}
      </div>
      
      {isWatingPlayerListOpen ? (
        <WaitingPlayerList />
      ) :<img src={footballPlayer} alt="footballPlayer" className="w-full h-[70vh]"/>}
    </div>
  );
};

export default WaitingPlayerListPanel;
