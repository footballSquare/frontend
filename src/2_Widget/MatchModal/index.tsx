import React from "react";
import useMatchModalStore from "../../4_Shared/zustand/useMatchModal";
import close_icon from "../../4_Shared/assets/svg/closeBtn.svg";
import flag_icon from "../../4_Shared/assets/svg/flag-green.svg";
import FormationPanel from "./ui/FormationPanel";
import useGetMatchDetail from "../../3_Entity/Match/useGetMatchDetail";
import { matchType } from "../../4_Shared/constant/matchType";
import { matchParticipation } from "../../4_Shared/constant/matchParticipation";
import WaitingList from "./ui/WaitList";
import useGetMatchParticipants from "../../3_Entity/Match/useGetMatchParticipants";
import useGetMatchWaitlist from "../../3_Entity/Match/useGetMatchWaitList";
import useMatchApprove from "./model/useMatchApprove";
import useMatchApply from "./model/useMatchApply";
import { matchPosition } from "../../4_Shared/constant/matchPosition";
import { matchState } from "../../4_Shared/constant/matchState";
import StatPanel from "./ui/StatPanel";
const MatchModal = () => {
  // 로그인 구현 이전 임시 데이터
  const [myInfo, setMyInfo] = React.useState({
    userIdx: 1,
    nickName: "master",
    profileUrl: "testing...",
  });
  const isMatchLeader = true;
  // 로그인 구현 이전 임시 데이터

  const { matchIdx, toggleMatchModal } = useMatchModalStore();
  const [matchDetail] = useGetMatchDetail(matchIdx);
  const [matchParticipants, setMatchPaticipants] =
    useGetMatchParticipants(matchIdx);
  const [matchWaitList, setMatchWaitList] = useGetMatchWaitlist(matchIdx);
  const [matchApproveHandler, matchDisApproveHandler] = useMatchApprove(
    setMatchWaitList,
    setMatchPaticipants
  );
  const [matchApplyHandler] = useMatchApply(setMatchWaitList);

  return (
    // 모달 커버
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray"
        onClick={toggleMatchModal}
      ></div>
      {/* 모달 */}
      <div className="flex flex-col relative w-[80%] h-[80%] bg-white gap-4 border-1 border-gray p-4 overflow-auto">
        {/* 타이틀 / 닫기 버튼 / 대회명(대회 매치 전용) / 게임 팀 이름(팀 없으면 공방) */}
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <img className="w-[32px]" src={flag_icon} alt="MATCH" />
            <h2>매치 정보</h2>
          </div>
          <button onClick={toggleMatchModal}>
            <img src={close_icon} alt="close" />
          </button>
        </div>
        {/* 매치모드 / 참여방식 / 플레이타임 / 매치 시작 시간 / 게임모드 */}
        <div className="flex gap-6">
          <label className="flex flex-col text-xs font-semibold">
            예상 플레이 타임
            {/* 아래의 select 태그 Select 컴포넌트로 적용 */}
            <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border-1 border-blue">
              {`${matchDetail.match.match_match_duration.hours} 시간 ${matchDetail.match.match_match_duration.minutes} 분`}
            </p>
          </label>
          <label className="flex flex-col text-xs font-semibold">
            참가 모드
            <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border-1 border-blue">
              {
                matchParticipation[
                  matchDetail.match.match_match_participation_type
                ]
              }
            </p>
          </label>

          <label className="flex flex-col text-xs font-semibold">
            시작 시간
            <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border-1 border-gray">
              {matchDetail.match.match_match_start_time}
            </p>
          </label>

          <label className="flex flex-col text-xs font-semibold">
            매치 종류
            <p className="flex justify-center items-center h-[32px]">
              {matchType[matchDetail.match.match_type_idx]}
            </p>
          </label>
        </div>

        {/* 포메이션 / 포지션 / 포지션별 대기 인원(승인 참가 전용) */}
        <div className="flex gap-6 h-[70%]">
          {/* 필드 & 포메이션 */}
          <FormationPanel
            matchFormationIdx={matchDetail.match.match_formation_idx}
            matchParticipants={matchParticipants.match_participant}
            matchDisApproveHandler={matchDisApproveHandler}
            isMatchLeader={isMatchLeader}
          />

          {/* && !isPastTime(match.match_match_start_time) */}
          {/* 
            매치 라인업 마감 전: 포지션 별 지원하기 버튼을 승인/아무나 참여 방식에 따라 다르게 배치

            매치 라인업 마감 후 & 매치 스탯 입력 마감 전: 매치 리더에게는, 매치 마감 버튼을 출력해주고, 참여자는 스탯 입력 가능

            매치 마감 후: 스탯 고정
           */}
          {matchState[matchDetail.match.common_status_idx] ===
          "매치 라인업 마감 전" ? (
            matchParticipation[
              matchDetail.match.match_match_participation_type
            ] === "승인 참여" ? (
              <WaitingList
                matchFormationPosition={
                  matchDetail.match.match_formation_position
                }
                matchParticipants={matchParticipants.match_participant}
                matchWaitList={matchWaitList.match_waitlist}
                matchApproveHandler={matchApproveHandler}
                matchApplyHandler={matchApplyHandler}
                isMatchLeader={isMatchLeader}
              />
            ) : (
              <div className=" flex flex-col gap-4 h-[300px] flex-wrap">
                {matchDetail.match.match_formation_position.map(
                  (positionIdx) => {
                    return (
                      !matchParticipants.match_participant.some(
                        (elem) => elem.match_position_idx === positionIdx
                      ) && (
                        <button
                          className=" border-1 border-gray shadow-lg p-[2px] w-[128px] hover:bg-blue hover:text-white"
                          onClick={() => {
                            matchApproveHandler(
                              {
                                player_list_idx: myInfo.userIdx,
                                player_list_nickname: myInfo.nickName,
                                player_list_url: myInfo.profileUrl,
                              },
                              positionIdx,
                              matchParticipants.match_participant
                            );
                          }}
                        >
                          {matchPosition[positionIdx]}로 참가하기
                        </button>
                      )
                    );
                  }
                )}
              </div>
            )
          ) : matchState[matchDetail.match.common_status_idx] !==
            "매치 스탯 입력 마감" ? (
            <StatPanel  matchParticipants={matchParticipants.match_participant}/>
          ) : (
            "매치 결과"
          )}
        </div>
        {/* 변경 사항 저장 / 매치 강제 종료 / 매치 삭제 <- 매치 생성자 전용*/}
      </div>
    </div>
  );
};

export default MatchModal;
