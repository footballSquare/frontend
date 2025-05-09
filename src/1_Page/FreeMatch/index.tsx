import MatchList from "./ui/MatchList";
import Button from "../../4_Shared/components/Button";
import useMakeMatchModalStore from "../../4_Shared/zustand/useMakeMatchModalStore";
import StandbyListPanel from "./ui/StandbyListPanel";
import { useIsLogin } from "../../4_Shared/lib/useMyInfo";

const FreeMatch = () => {
  const [isLogin] = useIsLogin();
  const { toggleMakeMatchModal } = useMakeMatchModalStore();
  return (
    <div className="lg:px-[60px] max-w-[1680px] flex lg:flex-row justify-between flex-col w-full px-4 pt-4 gap-[32px]">
      <div className="flex flex-col w-full gap-4">
        {/* 버튼 목록 */}
        {isLogin && (
          <div className="flex justify-between w-full">
            <Button
              text="공개 매치 생성"
              bg="cement"
              textColor="grass"
              borderColor="grass"
              onClickHandler={toggleMakeMatchModal}
            />
          </div>
        )}

        {/* 매치 목록 */}
        <h4 className=" text-grass">현재 경기</h4>
        <MatchList />
      </div>

      {/* 대기 인원 목록 */}
      <StandbyListPanel />
    </div>
  );
};

export default FreeMatch;
