import React from "react";
import { useNavigate } from "react-router-dom";

const useManagePostTeamServerState = (
  serverState: Record<string, unknown> | null
) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        alert("팀 생성 완료");
        navigate(`/team/${serverState.team_list_idx}`);
        break;
      case 401:
        console.log("인증 실패");
        break;
      case 403:
        alert("이미 가입된 팀이 있습니다");
        break;
      case 409:
        alert("잘못된 입력");
        break;
      default:
        alert("잘못된 입력");
    }
  }, [serverState]);
};
export default useManagePostTeamServerState;
