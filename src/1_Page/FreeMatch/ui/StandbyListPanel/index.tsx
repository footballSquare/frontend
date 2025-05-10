import Button from "../../../../4_Shared/components/Button";
import StandbyList from "../../../../2_Widget/StandbyList";
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
            borderColor="grass"
            bg="cement"
            textColor="grass"
            onClickHandler={() => {
              toggleStandbyList();
            }}
          />
        ) : (
          <Button
            text="매치 대기 인원 보기"
            borderColor="grass"
            bg="cement"
            textColor="grass"
            onClickHandler={() => {
              toggleStandbyList();
            }}
          />
        )}
      </div>

      {isStandbyListOpen ? (
        <StandbyList />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default StandbyListPanel;
