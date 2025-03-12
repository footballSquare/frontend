import Button from "../../../../4_Shared/components/Button";
import StandbyList from "../../../../2_Widget/StandbyList";
import footballPlayer from "../../../../4_Shared/assets/img/footballPlayer.png";
import useStandbyList from "./model/useStandbyList";
const StandbyListPanel = () => {
  const [isStandbyListOpen, toggleStandbyList] = useStandbyList();

  return (
    <div className=" flex flex-col gap-4 w-[50%] h-[80vh] overflow-y-auto">
      {/* Button Wrapper */}
      <div className="w-[70%]">
        {isStandbyListOpen ? (
          <Button
            text="매치 대기 인원 보기"
            bg="white"
            textColor="blue"
            bold={true}
            onClickHandler={() => {
              toggleStandbyList();
            }}
          />
        ) : (
          <Button
            text="매치 대기 인원 보기"
            bg="blue"
            textColor="white"
            bold={true}
            onClickHandler={() => {
              toggleStandbyList();
            }}
          />
        )}
      </div>

      {isStandbyListOpen ? (
        <StandbyList />
      ) : (
        <img
          src={footballPlayer}
          alt="footballPlayer"
          className="w-full h-[70vh]"
        />
      )}
    </div>
  );
};

export default StandbyListPanel;
