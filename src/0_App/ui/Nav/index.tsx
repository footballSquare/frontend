import logo from "../../../4_Shared/assets/svg/logo.svg";
import NavigationBtn from "./ui/NavigationBtn";
import SignBtns from "./ui/SignBtns";
const Nav = () => {
  return (
    <nav className="flex h-[80px] w-full justify-center items-center">
      <div className="sm:justify-between flex justify-center max-w-[1280px] w-full items-center">
        {/* Logo */}
        <button className="lg:flex hidden items-center justify-center">
          <img
            className="lg:min-w-[120px] w-[120px]"
            src={logo}
            alt="home button"
          />
        </button>
        {/* Navigation Btns */}
        <div className="lg:gap-[30px] gap-3 flex items-center justify-between ">
          <NavigationBtn text={"TEAM LIST"} />
          <NavigationBtn text={"MY TEAM"} />
          <NavigationBtn text={"FIND MATCH"} />
          <NavigationBtn text={"COMMUNITY"} />
          <NavigationBtn text={"RANKING"} />
          <NavigationBtn text={"MY PROFILE"} />
        </div>
        {/* SignUp/out LogIn/Out Btns */}
        <SignBtns />
      </div>
    </nav>
  );
};

export default Nav;
