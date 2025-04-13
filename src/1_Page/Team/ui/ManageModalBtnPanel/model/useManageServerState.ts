import React from "react";
import { useRemoveTeamCookie } from "../../../../../4_Shared/lib/useMyInfo";

const useManageServerState = (serverState: Record<string, unknown> | null) => {
  const [removeTeamCookie] = useRemoveTeamCookie();

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        removeTeamCookie();
        alert("팀 탈퇴가 완료되었습니다.");
        break;
    }
  }, [serverState]);
};

export default useManageServerState;
