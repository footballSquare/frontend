import React from "react";

const useManageAction = (
  isTeamPlayer: boolean
): [boolean, boolean, (actionEvent: () => void) => void] => {
  // 상태: 팀에 가입된 상태인지, 가입 신청 중인지, 탈퇴 상태인지
  const [isTeamMember, setIsTeamMember] = React.useState<boolean>(isTeamPlayer);
  const [isJoinRequestPending, setIsJoinRequestPending] =
    React.useState<boolean>(false); // 가입신청중 상태

  const handleJoinLeave = (actionEvent: () => void) => {
    const action = isTeamMember ? "탈퇴" : "가입";
    if (confirm(`정말로 팀을 ${action}하시겠습니까?`)) {
      actionEvent();
      if (isTeamMember) {
        // 탈퇴 처리
        alert("탈퇴되었습니다");
        setIsTeamMember(false);
      } else if (!isJoinRequestPending) {
        // 가입 처리
        alert("가입 신청 완료되었습니다");
        setIsJoinRequestPending(true); // 가입 신청 중으로 상태 변경
        setIsTeamMember(true); // 가입 후 상태 변경
      }
    }
  };

  return [isTeamMember, isJoinRequestPending, handleJoinLeave];
};

export default useManageAction;
