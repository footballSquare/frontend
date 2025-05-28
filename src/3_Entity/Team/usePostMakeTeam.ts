import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
const usePostMakeTeam = (): [
  postMakeTeam: (props: UsePostMakeTeam) => Promise<number | undefined>,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const navigate = useNavigate();
  const { setTeamIdx } = useAuthStore();

  const postMakeTeam = async (props: UsePostMakeTeam) => {
    const endPoint = `/team`;
    return await request("POST", endPoint, props, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        alert("팀 생성 성공");
        navigate(`/team/${serverState.team_list_idx}`);
        setTeamIdx(serverState.team_list_idx as number);
        break;
      case 403:
        alert("이미 팀이 존재합니다");
        break;
      case 409:
        alert("팀명 증복입니다");
        alert("팀 약칭 증복입니다");
        console.error("팀 생성 실패", serverState.data);
        break;
      default:
        alert("서버 오류입니다.");
        break;
    }
  }, [serverState]);

  return [postMakeTeam, serverState, loading];
};

export default usePostMakeTeam;
