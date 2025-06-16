import { useNavigate } from "react-router-dom";
import { useAuthStore, useIsLogin } from "../../../../4_Shared/lib/useMyInfo";
import PAGE_URI from "../../../../4_Shared/constant/pageUri";
const useNavigationBtns = (): [
  navigationBtns: {
    text: string;
    handler: () => void | Promise<void>;
  }[]
] => {
  const { teamIdx, userIdx } = useAuthStore();
  const [isLogin] = useIsLogin();
  const navigate = useNavigate();

  const navigationBtns = [
    {
      text: "TOPICS",
      handler: () => navigate(PAGE_URI.TOPICS),
    },
    {
      text: "TEAM LIST",
      handler: () => navigate(PAGE_URI.TEAMLIST),
    },
    {
      text: "MY TEAM",
      handler: () => {
        if (!isLogin) {
          navigate(`${PAGE_URI.LOGIN}`);
        } else if (teamIdx) {
          navigate(`${PAGE_URI.TEAM}/${teamIdx}`);
        } else {
          alert("소속 팀이 없습니다.");
        }
      },
    },
    {
      text: "FIND MATCH",
      handler: () => navigate(PAGE_URI.FREEMATCH),
    },
    {
      text: "COMMUNITY",
      handler: () => navigate(`${PAGE_URI.COMMUNITY}/0`),
    },
    {
      text: "MY PROFILE",
      handler: () => {
        if (isLogin) {
          navigate(`${PAGE_URI.PROFILE}/${userIdx}`);
        } else {
          navigate(`${PAGE_URI.LOGIN}`);
        }
      },
    },
  ];

  return [navigationBtns];
};
export default useNavigationBtns;
