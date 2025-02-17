import logo from "../../../4_Shared/assets/svg/logo.svg";
const Header = () => {
  return (
    <div className="h-[130px] w-full flex justify-between items-center bg-grass">
      <button className="flex items-center justify-center ml-8">
        <img className="min-w-[130px] w-[130px]" src={logo} alt="home button" />
      </button>

      <div className="flex items-center justify-between gap-[102px] mx-[200px]">
        <button className="flex items-center justify-center">
          <h5 className="font-bold">TEAM LIST</h5>
        </button>

        <button className="flex items-center justify-center">
          <h5 className="font-bold">MY TEAM</h5>
        </button>

        <button className="flex items-center justify-center">
          <h5 className="font-bold">FIND MATCH</h5>
        </button>

        <button className="flex items-center justify-center">
          <h5 className="font-bold">COMMUNITY</h5>
        </button>

        <button className="flex items-center justify-center">
          <h5 className="font-bold">RANKING</h5>
        </button>

        <button className="flex items-center justify-center">
          <h5 className="font-bold">MY PROFILE</h5>
        </button>
      </div>

      <button className="flex items-center justify-center mr-[200px]">
        <h5 className="font-bold">로그인 하기</h5>
      </button>
    </div>
  );
};

export default Header;
