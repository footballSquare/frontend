import StandbyListPanel from "./ui/StandbyListPanel";
import MatchList from "./ui/MatchList";
import Button from "../../4_Shared/components/Button";
import PostOpenMatchPanel from "./ui/PostOpenMatchPanel";

const FreeMatch = () => {
  return (
    <div className="lg:px-[60px] max-w-[1680px] flex lg:flex-row justify-between flex-col w-full px-4 pt-4 gap-[32px]">
      {/* 매치 목록 */}
      <div className="flex flex-col w-full gap-4">
        {/* 매치 생성 / 선호 포지션 참여 / 랜덤 참여 버튼*/}
        <div className="flex justify-between w-full">
          <div className="flex gap-4 bg-light-blue">
            <PostOpenMatchPanel />
            <Button
              text="선호 포지션 참여"
              bg="blue"
              textColor="white"
              bold={true}
            />
            <Button text="랜덤 참여" bg="blue" textColor="white" bold={true} />
          </div>
        </div>
        <h4 className=" text-blue">현재 경기</h4>
        <MatchList />
      </div>
      {/* 대기 인원 목록 */}
      <StandbyListPanel />
    </div>
  );
};

export default FreeMatch;
