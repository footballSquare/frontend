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
import StatPanel from "./ui/StatPanel";
const MatchModal = () => {
  // 로그인 구현 이전 임시 데이터
  const isMatchLeader = true;
  // 로그인 구현 이전 임시 데이터

  const { matchIdx, toggleMatchModal } = useMatchModalStore();
  const [matchDetail] = useGetMatchDetail(matchIdx);
  const [matchParticipants, setMatchParticipants] =
    useGetMatchParticipants(matchIdx);
  const [matchWaitList, setMatchWaitList] = useGetMatchWaitlist(matchIdx);
  const [matchApproveHandler, matchDisApproveHandler] = useMatchApprove({
    setMatchWaitList,
    setMatchParticipants,
  });
  const [matchApplyHandler] = useMatchApply({ setMatchWaitList });

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
              {`${matchDetail.match_match_duration.hours} 시간 ${matchDetail.match_match_duration.minutes} 분`}
            </p>
          </label>
          <label className="flex flex-col text-xs font-semibold">
            참가 모드
            <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border-1 border-blue">
              {matchParticipation[matchDetail.match_match_participation_type]}
            </p>
          </label>

          <label className="flex flex-col text-xs font-semibold">
            시작 시간
            <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border-1 border-gray">
              {matchDetail.match_match_start_time}
            </p>
          </label>

          <label className="flex flex-col text-xs font-semibold">
            매치 종류
            <p className="flex justify-center items-center h-[32px]">
              {matchType[matchDetail.match_type_idx]}
            </p>
          </label>
        </div>

        {/* 포메이션 / 포지션 / 포지션별 대기 인원(승인 참가 전용) */}
        <div className="flex gap-6 h-[70%]">
          {/* 필드 & 포메이션 */}
          <FormationPanel
            matchFormationIdx={matchDetail.match_formation_idx}
            matchParticipants={matchParticipants}
            matchDisApproveHandler={matchDisApproveHandler}
            isMatchLeader={isMatchLeader}
          />

          {matchDetail.common_status_idx === 0 ? (
            matchDetail.match_match_participation_type === 0 ? (
              // 매치 라인업 마감 전 & 승인 참여
              <WaitingList
                matchFormationPosition={matchDetail.match_formation_position}
                matchParticipants={matchParticipants}
                matchWaitList={matchWaitList.match_waitlist}
                matchApproveHandler={matchApproveHandler}
                matchApplyHandler={matchApplyHandler}
                isMatchLeader={isMatchLeader}
              />
            ) : (
              // 매치 라인업 마감 전 & 자유 참여
              <div className=" flex flex-col gap-4 h-[300px] flex-wrap">
                {matchDetail.match_formation_position.map((positionIdx) => {
                  return (
                    !matchParticipants.some(
                      (elem) => elem.match_position_idx === positionIdx
                    ) && (
                      <button
                        className=" border-1 border-gray shadow-lg p-[2px] w-[128px] hover:bg-blue hover:text-white"
                        onClick={() => {
                          matchApproveHandler({
                            player: {
                              player_list_idx: 1,
                              player_list_nickname: "master",
                              player_list_url: "url",
                            },
                            matchPosition: positionIdx,
                            matchParticipants: matchParticipants,
                          });
                        }}
                      >
                        {matchPosition[positionIdx]}로 참가하기
                      </button>
                    )
                  );
                })}
              </div>
            )
          ) : (
            // 매치 라인업 마감 & 대회
            matchDetail.common_status_idx !== 2 &&
            matchDetail.match_match_attribute === 2 && (
              <StatPanel matchParticipants={matchParticipants} />
            )
          )}
        </div>
        {/* 변경 사항 저장 / 매치 강제 종료 / 매치 삭제 <- 매치 생성자 전용*/}
      </div>
    </div>
  );
};

export default MatchModal;
