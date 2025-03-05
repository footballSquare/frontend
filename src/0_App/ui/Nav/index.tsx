import PAGE_URI from "../../../4_Shared/constant/pageUri";
import HomeBtn from "./ui/HomeBtn";
import NavigationBtn from "./ui/NavigationBtn";
import SignBtns from "./ui/SignBtns";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const tempTeamIdx = 1;
  const tempUserIdx = 1;
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
              navigate(`${PAGE_URI.TEAM}/${tempTeamIdx}`);
            }}
          />
          <NavigationBtn
            text={"FIND MATCH"}
            navigationHandler={() => {
              navigate(PAGE_URI.FREEMATCH);
            }}
          />
          <NavigationBtn
            text={"COMMUNITY"}
            navigationHandler={() => {
              navigate(PAGE_URI.COMMUNITY);
            }}
          />
          <NavigationBtn
            text={"RANKING"}
            navigationHandler={() => {
              navigate(PAGE_URI.RANKING);
            }}
          />
          <NavigationBtn
            text={"MY PROFILE"}
            navigationHandler={() => {
              navigate(`${PAGE_URI.PROFILE}/${tempUserIdx}`);
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
