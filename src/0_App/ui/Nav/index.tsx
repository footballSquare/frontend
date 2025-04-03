import PAGE_URI from "../../../4_Shared/constant/pageUri";
import {
  useIsLogin,
  useMyTeamIdx,
  useMyUserIdx,
} from "../../../4_Shared/lib/useMyInfo";
import HomeBtn from "./ui/HomeBtn";
import NavigationBtn from "./ui/NavigationBtn";
import SignBtns from "./ui/SignBtns";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const [isLogin] = useIsLogin();
  const [teamIdx] = useMyTeamIdx();
  const [userIdx] = useMyUserIdx();
  return (
    <nav className=" fixed top-0 left-0 flex h-[80px] w-full justify-center items-center bg-white shadow-md">
      <div className="sm:justify-between flex justify-center max-w-[1280px] w-full items-center">
        {/* HomeBtn(Logo) */}
        <HomeBtn />
        {/* Navigation Btns */}
        <div className="lg:gap-[30px] gap-3 flex items-center justify-between ">
          <NavigationBtn
            text={"TEAM LIST"}
            navigationHandler={() => {
              navigate(PAGE_URI.TEAMLIST);
            }}
          />
          <NavigationBtn
            text={"MY TEAM"}
            navigationHandler={() => {
              if (!isLogin) {
                navigate(`${PAGE_URI.LOGIN}`);
              } else if (teamIdx) {
                navigate(`${PAGE_URI.TEAM}/${teamIdx}`);
              } else {
                alert("소속 팀이 없습니다.");
              }
            }}
          />
          <NavigationBtn
            text={"FIND MATCH"}
            navigationHandler={() => {
              navigate(PAGE_URI.FREEMATCH);
            }}
          />
          <div className="relative group">
            <NavigationBtn
              text={"COMMUNITY"}
              navigationHandler={() => {
                navigate(`${PAGE_URI.COMMUNITY}/0`);
              }}
            />
            <div className="absolute left-0 hidden group-hover:flex flex-col gap-2 bg-white shadow-md border border-gray w-min-full p-2">
              <NavigationBtn
                text={"KFPL"}
                navigationHandler={() => {
                  navigate(`${PAGE_URI.COMMUNITY}/0`);
                }}
              />
              <NavigationBtn
                text={"unknownCoummunity"}
                navigationHandler={() => {
                  navigate(`${PAGE_URI.COMMUNITY}/0`);
                }}
              />
              <NavigationBtn
                text={"asdfCommu"}
                navigationHandler={() => {
                  navigate(`${PAGE_URI.COMMUNITY}/0`);
                }}
              />
            </div>
          </div>
          <NavigationBtn
            text={"RANKING"}
            navigationHandler={() => {
              navigate(PAGE_URI.RANKING);
            }}
          />
          <NavigationBtn
            text={"MY PROFILE"}
            navigationHandler={() => {
              if (isLogin) {
                navigate(`${PAGE_URI.PROFILE}/${userIdx}`);
              } else {
                navigate(`${PAGE_URI.LOGIN}`);
              }
            }}
          />
        </div>
        {/* SignUp/out LogIn/Out Btns */}
        <SignBtns />
      </div>
    </nav>
  );
};

export default Nav;
