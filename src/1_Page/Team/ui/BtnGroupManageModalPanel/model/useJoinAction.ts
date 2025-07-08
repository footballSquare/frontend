import React from "react";
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

  // 팀 멤버십 상태 관리 (true: 팀 멤버, false: 팀 멤버가 아님)
  const [isCurrentTeamMember, setIsCurrentTeamMember] =
    React.useState<boolean>(false);

  // 현재 사용자가 해당 팀의 플레이어인지 확인
  const isCurrentUserTeamMember = myTeamIdx === teamIdx;

  // 팀 멤버십 초기 상태 설정
  React.useEffect(() => {
    setIsCurrentTeamMember(isCurrentUserTeamMember);
  }, [isCurrentUserTeamMember]);

  // 역할 체크 (팀 멤버이면서 특정 역할인 경우)
  const isTeamCaptain = isCurrentTeamMember && myTeamRoleIdx === 0;
  const isTeamSubLeader = isCurrentTeamMember && myTeamRoleIdx === 1;

  // 상태 업데이트 함수들
  const setMembershipToUnavailable = () => {
    setIsCurrentTeamMember(false);
  };

  const setMembershipToAvailable = () => {
    setIsCurrentTeamMember(true);
  };

  return {
    isTeamCaptain,
    isTeamSubLeader,
    isCurrentTeamMember,
    setMembershipToAvailable,
    setMembershipToUnavailable,
  };
};

export default useJoinAction;
