import React from "react";
import { useRemoveTeamCookie } from "../../../../../4_Shared/lib/useMyInfo";

const useManageDeleteServerState = ({
  deleteServerState,
  cancelUpdateToLeave,
}: UseManageDeleteServerStateProps) => {
  const [removeTeamCookie] = useRemoveTeamCookie();

  React.useEffect(() => {
    if (!deleteServerState) return;
    switch (deleteServerState.status) {
      case 200:
        removeTeamCookie();
        alert("팀 탈퇴가 완료되었습니다.");
        break;
      default:
        cancelUpdateToLeave();
        alert("탈퇴에 실패했습니다");
        break;
    }
  }, [deleteServerState]);
};

export default useManageDeleteServerState;
