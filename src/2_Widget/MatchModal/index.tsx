import React from "react";
import WaitingPlayerListPanel from "./ui/WaitingPlayerListPanel";
const MatchModal = () => {
  return (
    // 모달 커버
    <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div className=" absolute top-0 left-0 w-[100vw] h-[100vh] opacity-50 bg-gray"></div>
      {/* 모달 */}
      <div className=" flex flex-col justify-center relative items-center w-[80%] h-[80%] bg-white gap-4">

        {/* 타이틀 / 닫기 버튼 / 대회명(대회 매치 전용) / 게임 팀 이름(팀 없으면 공방?) */}

        {/* 매치모드 / 참여방식 / 플레이타임 / 매치 시작 시간 / 매치종류  <- 매치 생성자는 시작시간 전에 변경 가능*/}

        {/* 포메이션 / 포지션 / 포지션별 대기 인원(승인 참가 전용) */}

        {/* 변경 사항 저장 / 매치 강제 종료 / 매치 삭제 <- 매치 생성자 전용*/}

        {/* 매치 참여 희망 인원 목록 */}
        <WaitingPlayerListPanel />
      </div>
    </div>
  );
};

export default MatchModal;
