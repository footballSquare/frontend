import useMatchModalStore from "../../4_Shared/zustand/useMatchModal";
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
import { useIsLogin, useMyUserIdx } from "../../4_Shared/lib/useMyInfo";
import useDeleteMatch from "../../3_Entity/Match/useDeleteMatch";
import { useNavigate } from "react-router-dom";
import { utcFormatter } from "../../4_Shared/lib/utcFormatter";
import useMatchEnd from "./model/useMatchEnd";
import FreeParticipationPanel from "./ui/FreeParticipationPanel";
import ModalLayer from "../../4_Shared/components/ModalLayer";

const MatchModal = () => {
  const { matchIdx, toggleMatchModal } = useMatchModalStore();
  const [isLogin] = useIsLogin();
  const [userIdx] = useMyUserIdx();

  const [matchParticipants, setMatchParticipants] = useGetMatchParticipants({
    matchIdx,
  });
  const [matchDetail, setMatchDetail] = useGetMatchDetail({ matchIdx });
  const {
    player_list_idx,
    player_list_nickname,
    player_list_profile_image,
    match_formation_idx,
    match_position_idxs,
    match_match_participation_type,
    match_type_idx,
    match_match_start_time,
    match_match_duration,
    common_status_idx,
    match_match_attribute,
  } = matchDetail;
  const isMatchLeader = userIdx === player_list_idx;
  const [matchWaitList, setMatchWaitList] = useGetMatchWaitlist({ matchIdx });

  const [matchApproveHandler, matchDisApproveHandler] = useMatchApprove({
    setMatchWaitList,
    setMatchParticipants,
  });

  const [matchApplyHandler] = useMatchApply({
    setMatchWaitList,
    setMatchParticipants,
    isMatchLeader,
    isTeamMatch: match_match_attribute !== 0,
  });
  const [matchEndHandler] = useMatchEnd({ setMatchDetail });
  const [deleteMatch] = useDeleteMatch();
  const navigate = useNavigate();

  return (
    <ModalLayer toggleModalHandler={toggleMatchModal} shape="wide" mode="dark">
      {/* 타이틀 / 닫기 버튼 / 대회명(대회 매치 전용) / 게임 팀 이름(팀 없으면 공방) */}
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <img className="w-[32px]" src={flag_icon} alt="MATCH" />
          <h2>매치 정보</h2>
        </div>
        <button onClick={toggleMatchModal} className="text-white text-2xl">
          x
        </button>
      </div>
      {/* 매치모드 / 참여방식 / 플레이타임 / 매치 시작 시간 / 게임모드 */}
      <div className="flex gap-6">
        <label className="flex flex-col text-xs font-semibold">
          예상 플레이 타임
          {/* 아래의 select 태그 Select 컴포넌트로 적용 */}
          <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border border-gray-500">
            {match_match_duration?.hours !== undefined &&
              `${match_match_duration.hours}시간 `}
            {match_match_duration?.minutes !== undefined &&
              `${match_match_duration.minutes}분`}
          </p>
        </label>
        <label className="flex flex-col text-xs font-semibold">
          참가 모드
          <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border border-gray-500">
            {matchParticipation[match_match_participation_type]}
          </p>
        </label>

        <label className="flex flex-col text-xs font-semibold">
          시작 시간
          <p className="flex justify-center items-center w-[164px] h-[32px] rounded-[4px] border border-gray-500">
            {utcFormatter(match_match_start_time)}
          </p>
        </label>

        <label className="flex flex-col text-xs font-semibold">
          매치 종류
          <span className="flex justify-center items-center border border-gray-500 rounded-[4px] h-[32px]">
            {matchType[match_type_idx]}
          </span>
        </label>

        {/* 매치 리더 프로필 이동 버튼 */}
        <div className="flex flex-col text-xs font-semibold relative hover:scale-[1.2] duration-300">
          Host
          <div
            onClick={() => {
              toggleMatchModal();
              navigate(`profile/${player_list_idx}`);
            }}
            className="flex justify-center items-center w-[164px] h-[32px] border border-gray-500 rounded-[4px] cursor-pointer"
          >
            <h2>{player_list_nickname}</h2>
            <img
              src={player_list_profile_image || undefined}
              alt="profile"
              className="w-[32px] h-[32px] rounded-full absolute bottom-0 left-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 포메이션 / 포지션 / 포지션별 대기 인원(승인 참가 전용) */}
      <div className="flex gap-2 h-[80%]">
        {/* 필드 & 포메이션 */}
        <FormationPanel
          matchFormationIdx={match_formation_idx}
          matchParticipants={matchParticipants}
          matchDisApproveHandler={matchDisApproveHandler}
          isMatchLeader={isMatchLeader}
          matchParticipationType={matchDetail.match_match_participation_type}
        />

        {/* 승인참여 : 자유참여 */}

        {isLogin &&
          (match_match_participation_type === 0 ? (
            <div className="w-full">
              {/* 공개 매치 : 비공개 매치 : 대회 매치 */}
              {match_match_attribute === 0 ? (
                /* 라인업 마감 전 : 라인업 마감 */
                common_status_idx === 0 ? (
                  <WaitingList
                    matchFormationPosition={match_position_idxs}
                    matchParticipants={matchParticipants}
                    matchWaitList={matchWaitList.match_waitlist}
                    matchApproveHandler={matchApproveHandler}
                    matchApplyHandler={matchApplyHandler}
                    isMatchLeader={isMatchLeader}
                  />
                ) : (
                  <div>마감된 경기입니다...</div>
                )
              ) : match_match_attribute === 1 ? (
                /* 라인업 마감 전 : 라인업 마감 */
                common_status_idx === 0 ? (
                  <WaitingList
                    matchFormationPosition={match_position_idxs}
                    matchParticipants={matchParticipants}
                    matchWaitList={matchWaitList.match_waitlist}
                    matchApproveHandler={matchApproveHandler}
                    matchApplyHandler={matchApplyHandler}
                    isMatchLeader={isMatchLeader}
                  />
                ) : (
                  <div>마감된 경기입니다...</div>
                )
              ) : (
                match_match_attribute === 2 &&
                /* 라인업 마감 전 : 라인업 마감 & 스탯 입력 마감 전 : 스탯 입력 마감 */
                (common_status_idx === 0 ? (
                  <WaitingList
                    matchFormationPosition={match_position_idxs}
                    matchParticipants={matchParticipants}
                    matchWaitList={matchWaitList.match_waitlist}
                    matchApproveHandler={matchApproveHandler}
                    matchApplyHandler={matchApplyHandler}
                    isMatchLeader={isMatchLeader}
                  />
                ) : common_status_idx === 1 ? (
                  <p>대회 페이지에서 스탯을 입력할 수 있습니다.</p>
                ) : (
                  <p>
                    마감된 대회입니다. 대회 페이지에서 상세 정보를 확인할 수
                    있습니다.
                  </p>
                ))
              )}
            </div>
          ) : /* 라인업 마감 전 : 라인업 마감 */

          match_match_attribute === 0 ? (
            /* 라인업 마감 전 : 라인업 마감 */
            common_status_idx === 0 ? (
              <FreeParticipationPanel
                matchPositions={match_position_idxs}
                matchParticipants={matchParticipants}
                matchApplyHandler={matchApplyHandler}
                matchFormationIdx={match_formation_idx}
              />
            ) : (
              <div>마감된 경기입니다...</div>
            )
          ) : match_match_attribute === 1 ? (
            /* 라인업 마감 전 : 라인업 마감 */
            common_status_idx === 0 ? (
              <FreeParticipationPanel
                matchPositions={match_position_idxs}
                matchParticipants={matchParticipants}
                matchApplyHandler={matchApplyHandler}
                matchFormationIdx={match_formation_idx}
              />
            ) : (
              <div></div>
            )
          ) : (
            match_match_attribute === 2 &&
            /* 라인업 마감 전 : 라인업 마감 & 스탯 입력 마감 전 : 스탯 입력 마감 */
            (common_status_idx === 0 ? (
              <FreeParticipationPanel
                matchPositions={match_position_idxs}
                matchParticipants={matchParticipants}
                matchApplyHandler={matchApplyHandler}
                matchFormationIdx={match_formation_idx}
              />
            ) : common_status_idx === 1 ? (
              <p>대회 페이지에서 스탯을 입력할 수 있습니다.</p>
            ) : (
              <p>
                마감된 대회입니다. 대회 페이지에서 상세 정보를 확인할 수
                있습니다.
              </p>
            ))
          ))}
      </div>
      {/* 매치 마감&삭제 버튼 - 매치 호스트만 사용 가능*/}
      {isMatchLeader && (
        <div className="flex gap-4 justify-end">
          {/* 매치 마감 버튼 */}
          {common_status_idx === 0 && (
            <button
              className="border border-gray shadow-lg p-[2px] hover:bg-blue hover:text-white"
              onClick={() => {
                matchEndHandler({ matchIdx });
              }}
            >
              매치 마감
            </button>
          )}
          {/* 매치 삭제 버튼 */}
          {/*대회 매치가 아닌 경우에만 매치 삭제 버튼 노출*/}
          {match_match_attribute !== 2 && (
            <button
              className="border border-gray shadow-lg p-[2px] hover:bg-blue hover:text-white"
              onClick={() => {
                if (confirm("매치를 삭제하시겠습니까?")) {
                  deleteMatch({ matchIdx });
                }
              }}
            >
              매치 삭제
            </button>
          )}
        </div>
      )}
    </ModalLayer>
  );
};

export default MatchModal;
