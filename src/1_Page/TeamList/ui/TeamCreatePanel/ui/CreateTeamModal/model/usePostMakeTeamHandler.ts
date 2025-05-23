import { useNavigate } from "react-router-dom";
import usePostMakeTeam from "../../../../../../../3_Entity/Team/usePostMakeTeam";

const usePostMakeTeamHandler = () => {
  const [postMakeTeam, serverState] = usePostMakeTeam();
  const navigate = useNavigate();

  const handlePostMakeTeam = async (data: TeamCreateFormValues) => {
    const status = await postMakeTeam(data);
    console.log("status", status);
    console.log("serverState", serverState);
    switch (status) {
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
  };
  return [handlePostMakeTeam];
};
export default usePostMakeTeamHandler;
