import logo from "../../../4_Shared/assets/svg/logo.svg";
import PAGE_URI from "../../../4_Shared/constant/pageUri";
import HomeBtn from "./ui/HomeBtn";
import NavigationBtn from "./ui/NavigationBtn";
import SignBtns from "./ui/SignBtns";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex h-[80px] w-full justify-center items-center">
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
              navigate(PAGE_URI.TEAM);
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
              navigate(PAGE_URI.PROFILE);
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
