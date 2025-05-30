import usePutSignTeam from "../../../../../3_Entity/Team/usePutSignTeam";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";

const usePutSignTeamHandler = (cancelUpdateToSignPending: () => void) => {
  const teamIdx = useParamInteger("teamIdx");
  const [putSignTeam] = usePutSignTeam(teamIdx);

  const handlePutSignTeam = async () => {
    const status = await putSignTeam();
    switch (status) {
      case 200:
        break;
      case 403:
        alert("이미 가입한 팀이 있습니다");
        cancelUpdateToSignPending();
        break;
      default:
        cancelUpdateToSignPending();
        alert("서버 오류");
        break;
    }
  };
  return [handlePutSignTeam];
};

export default usePutSignTeamHandler;
