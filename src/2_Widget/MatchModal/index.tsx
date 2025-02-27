import React from "react";
import useMatchModalStore from "../../4_Shared/zustand/useMatchModal";
import close_icon from "../../4_Shared/assets/svg/closeBtn.svg";
import flag_icon from "../../4_Shared/assets/svg/flag-green.svg";
import FormationPanel from "./ui/FormationPanel";
import useGetMatchDetail from "../../3_Entity/Match/useGetMatchDetail";
import { MatchDetail } from "../../3_Entity/Match/type";
import Select from "../../4_Shared/components/Select";
import { matchType } from "../../4_Shared/constant/matchType";
import { matchParticipation } from "../../4_Shared/constant/matchParticipation";
import WaitingList from "./ui/WaitList";
import WaitingPlayerListPanel from "./ui/MatchSeekerListPanel";
import useGetMatchParticipants from "../../3_Entity/Match/useGetMatchParticipants";
import useGetMatchWaitlist from "../../3_Entity/Match/useGetMatchWaitList";
import { isPastTime } from "../../4_Shared/lib/timeChecker";

const MatchModal = () => {
  const { matchIdx, toggleMatchModal } = useMatchModalStore();
  //
  const [matchDetail, matchDetailLoading] = useGetMatchDetail(matchIdx);
  const [matchParticipants, setMatchPaticipants, matchParticipantsLoading] =
    useGetMatchParticipants(matchIdx);
  const [matchWaitList, matchWaitListLoading] = useGetMatchWaitlist(matchIdx);
  const matchDetailRef = React.useRef<MatchDetail>(matchDetail);
  /*
  1. 매치 참여자 목록은 하위 컴포넌트 전부 prop으로 받아서 수정함
*/
console.log(matchParticipants)
  return (
    // 모달 커버
    <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div
        className=" absolute top-0 left-0 w-[100vw] h-[100vh] opacity-50 bg-gray"
        onClick={toggleMatchModal}
      ></div>
      {/* 모달 */}
      <div className=" flex flex-col relative w-[80%] h-[80%] bg-white gap-4 border-1 border-gray p-4 overflow-auto">
        {/* 타이틀 / 닫기 버튼 / 대회명(대회 매치 전용) / 게임 팀 이름(팀 없으면 공방) */}
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

        {/* 매치모드 / 참여방식 / 플레이타임 / 매치 시작 시간 / 게임모드  <- 매치 생성자는 시작시간 전에 변경 가능*/}
        <div className=" flex gap-6">
          <label className=" flex flex-col text-xs font-semibold">
            매치 모드
            {/* 아래의 select 태그를 Shared에 있는 Select 컴포넌트로 변경해서 적용 */}
            <Select
              defaultValue={matchDetail.match.match_match_participation_type}
              options={[
                { value: 0, text: "팀 공개 매치" },
                { value: 1, text: "팀 비공개 매치" },
                { value: 2, text: "공방 매치" },
              ]}
              onChangeHandler={(e) => {
                matchDetailRef.current.match.match_match_participation_type =
                  Number(e.target.value);
              }}
            />
          </label>

          <label className=" flex flex-col text-xs font-semibold">
            예상 플레이 타임
            {/* 아래의 select 태그 Select 컴포넌트로 적용 */}
            <Select
              defaultValue={matchDetail.match.match_match_duration}
              options={[
                { value: "0.5 hours", text: "30분" },
                { value: "1 hours", text: "1시간" },
                { value: "1.4 hours", text: "1시간 30분" },
                { value: "2 hours", text: "2시간" },
                { value: "2.5 hours", text: "2시간 30분" },
              ]}
              onChangeHandler={(e) => {
                matchDetailRef.current.match.match_match_duration =
                  e.target.value;
              }}
            />
          </label>
          <label className=" flex flex-col text-xs font-semibold">
            참가 모드
            <p className=" flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border-1 border-blue">
              {
                matchParticipation[
                  matchDetail.match.match_match_participation_type
                ]
              }
            </p>
          </label>

          <label className=" flex flex-col text-xs font-semibold">
            시작 시간
            <p className=" flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border-1 border-gray">
              {matchDetail.match.match_match_start_time}
            </p>
          </label>

          <label className=" flex flex-col text-xs font-semibold">
            매치 종류
            <p className=" flex justify-center items-center h-[32px]">
              {matchType[matchDetail.match.match_type_idx]}
            </p>
          </label>
        </div>

        {/* 포메이션 / 포지션 / 포지션별 대기 인원(승인 참가 전용) */}
        <div className=" flex gap-6 h-full">
          {/* 필드 & 포메이션 선택기 */}
          <FormationPanel
            matchFormationIdx={matchDetail.match.match_formation_idx}
            matchWaitList={matchWaitList.match_waitlist}
            matchParticipants={matchParticipants.match_participant}
          />
          {/* && !isPastTime(match.match_match_start_time) */}
          {matchParticipation[
            matchDetail.match.match_match_participation_type
          ] === "승인 참여" && (
            <WaitingList
              match_formation_position={
                matchDetail.match.match_formation_position
              }
              matchParticipants={matchParticipants.match_participant}
              setMatchParticipants={setMatchPaticipants}
              matchWaitList={matchWaitList.match_waitlist}
            />
          )}
        </div>

        {/* 매치 참여 희망 인원 현황판 */}
        <WaitingPlayerListPanel />
        {/* 변경 사항 저장 / 매치 강제 종료 / 매치 삭제 <- 매치 생성자 전용*/}
      </div>
    </div>
  );
};

export default MatchModal;
