import React from "react";
import { RESULT_STATE } from "../../../../../4_Shared/constant/result";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";
import {
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../../4_Shared/lib/useMyInfo";

const useJoinAction = (): UseJoinActionReturn => {
  // 팀 정보 및 사용자 정보
  const teamIdx = useParamInteger("teamIdx");
  const [myTeamIdx] = useMyTeamIdx();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();

  // 팀 멤버십 상태 관리
  // pending : 가입 신청 중 | available : 팀 멤버 | unavailable : 팀 멤버가 아님
  const [teamMembershipStatus, setTeamMembershipStatus] =
    React.useState<ResultStateType>(
      RESULT_STATE.UNAVAILABLE as ResultStateType
    );

  // 현재 사용자가 해당 팀의 플레이어인지 확인
  const isCurrentUserTeamMember = myTeamIdx === teamIdx;

  // 팀 멤버십 초기 상태 설정
  React.useEffect(() => {
    const initialStatus = isCurrentUserTeamMember
      ? RESULT_STATE.AVAILABLE
      : RESULT_STATE.UNAVAILABLE;

    setTeamMembershipStatus(initialStatus as ResultStateType);
  }, [isCurrentUserTeamMember]);

  // 상태 체크
  const isJoinRequestPending = teamMembershipStatus === RESULT_STATE.PENDING;
  const isCurrentTeamMember = teamMembershipStatus === RESULT_STATE.AVAILABLE;

  // 역할 체크 (팀 멤버이면서 특정 역할인 경우)
  const isTeamCaptain = isCurrentTeamMember && myTeamRoleIdx === 0;
  const isTeamSubLeader = isCurrentTeamMember && myTeamRoleIdx === 1;

  // 상태 업데이트 함수들
  const setMembershipToUnavailable = () => {
    setTeamMembershipStatus(RESULT_STATE.UNAVAILABLE as ResultStateType);
  };

  const setMembershipToAvailable = () => {
    setTeamMembershipStatus(RESULT_STATE.AVAILABLE as ResultStateType);
  };

  const setMembershipToPending = () => {
    setTeamMembershipStatus(RESULT_STATE.PENDING as ResultStateType);
  };

  return {
    isTeamCaptain,
    isTeamSubLeader,
    isJoinRequestPending,
    isCurrentTeamMember,
    setMembershipToAvailable,
    setMembershipToPending,
    setMembershipToUnavailable,
  };
};

export default useJoinAction;
