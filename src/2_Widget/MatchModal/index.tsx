import useMatchModalStore from "../../4_Shared/zustand/useMatchModal";
import WaitingPlayerListPanel from "./ui/WaitingPlayerListPanel";
import close_icon from "../../4_Shared/assets/svg/closeBtn.svg";
import flag_icon from "../../4_Shared/assets/svg/flag-green.svg";
const MatchModal = () => {
  const { matchIdx, toggleMatchModal } = useMatchModalStore();
  // const [matchInfo, loading] =  useGetMatchInfo(matchIdx);
  return (
    // 모달 커버
    <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div
        className=" absolute top-0 left-0 w-[100vw] h-[100vh] opacity-50 bg-gray"
        onClick={toggleMatchModal}
      ></div>
      {/* 모달 */}
      <div className=" flex flex-col relative w-[80%] h-[80%] bg-white gap-4 border-1 p-4">
        {/* 타이틀 / 닫기 버튼 / 대회명(대회 매치 전용) / 게임 팀 이름(팀 없으면 공방?) */}
        <div className=" flex justify-between">
          <div className=" flex gap-4 items-center">
            <img className=" w-[32px]" src={flag_icon} alt="MATCH" />
            <h2>매치 정보</h2>
            <h4 className=" text-gray">@대회명</h4>
          </div>
          <button onClick={toggleMatchModal}>
            <img src={close_icon} alt="close" />
          </button>
        </div>

        {/* 매치모드 / 참여방식 / 플레이타임 / 매치 시작 시간 / 매치종류  <- 매치 생성자는 시작시간 전에 변경 가능*/}
        <div className=" flex gap-4">
          <label className=" flex flex-col text-xs font-semibold">
            매치 모드
            <select className=" w-[164px] h-[32px] rounded-lg border-1 border-blue">
              <option value="팀 공개 매치">팀 공개 매치</option>
              <option value="팀 비공개 매치">팀 비공개 매치</option>
              <option value="공방 매치">공방 매치</option>
            </select>
          </label>
          <label className=" flex flex-col text-xs font-semibold">
            참가 모드
            <select className=" w-[164px] h-[32px] rounded-lg border-1 border-blue">
              <option value="자유 참가">자유 참가</option>
              <option value="승인 참가">승인 참가</option>
            </select>
          </label>
          <label className=" flex flex-col text-xs font-semibold">
            예상 플레이 타임
            <select className=" w-[164px] h-[32px] rounded-lg border-1 border-blue">
              <option value="0.5">30분</option>
              <option value="1">1시간</option>
              <option value="1.5">1시간 30분</option>
              <option value="2">2시간</option>
              <option value="2.5">2시간 30분</option>
            </select>
          </label>
        </div>

        {/* 포메이션 / 포지션 / 포지션별 대기 인원(승인 참가 전용) */}

        {/* 변경 사항 저장 / 매치 강제 종료 / 매치 삭제 <- 매치 생성자 전용*/}

        {/* 매치 참여 희망 인원 목록 */}
        <WaitingPlayerListPanel />
      </div>
    </div>
  );
};

export default MatchModal;
