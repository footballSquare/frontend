import { useNavigate } from "react-router-dom";
import usePutSignTeam from "../../../../../3_Entity/Team/usePutSignTeam";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";
import {
  useAuthStore,
  useIsLogin,
} from "../../../../../4_Shared/lib/useMyInfo";

type UsePutSignTeamHandlerProps = {
  setMembershipToPending: () => void;
  setMembershipToUnavailable: () => void;
};

const usePutSignTeamHandler = (props: UsePutSignTeamHandlerProps) => {
  const { setMembershipToPending, setMembershipToUnavailable } = props;
  const teamIdx = useParamInteger("teamIdx");
  const [putSignTeam] = usePutSignTeam(teamIdx);
  const navigate = useNavigate();

  const [isLogin] = useIsLogin();
  const myTeamIdx = useAuthStore((state) => state.teamIdx);

  const handlePutSignTeam = async () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    if (myTeamIdx) {
      alert("이미 다른 팀에 소속되어 있습니다.");
      return;
    }
    if (!confirm(`정말로 팀을 가입 하시겠습니까?`)) return;
    setMembershipToPending();
    const status = await putSignTeam();
    switch (status) {
      case 200:
        break;
      case 403:
        alert("이미 가입한 팀이 있습니다");
        setMembershipToUnavailable();
        break;
      default:
        setMembershipToUnavailable();
        alert("서버 오류");
        break;
    }
  };
  return [handlePutSignTeam];
};

export default usePutSignTeamHandler;
