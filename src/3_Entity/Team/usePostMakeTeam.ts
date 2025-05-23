import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";
const usePostMakeTeam = (): [
  postMakeTeam: (props: UsePostMakeTeam) => Promise<number | undefined>,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const navigate = useNavigate();

  const postMakeTeam = async (props: UsePostMakeTeam) => {
    const endPoint = `/team`;
    return await request("POST", endPoint, props, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        alert("팀 생성 완료");
        navigate(`/team/${serverState.team_list_idx}`);
        break;
      case 401:
        alert("인증 실패");
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

  return [postMakeTeam, serverState, loading];
};

export default usePostMakeTeam;
