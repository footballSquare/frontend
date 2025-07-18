import welcomeBanner from "../../4_Shared/assets/img/welcomeBanner.png";
import { useNavigate } from "react-router-dom";
import { useIsLogin } from "../../4_Shared/lib/useMyInfo";
const Welcome = () => {
  const navigate = useNavigate();
  const [isLogin] = useIsLogin();
  return (
    <div className="flex h-full">
      <div className="flex flex-col">
        <p className=" font-bold text-6xl mt-[100px] text-white">
          MAKE ONLY
          <br />
          YOUR PLAY
          <br />
          WITH
          <br />
          FOOTBALL SQUARE
          <p className=" text-base font-light m-4 ml-0">
            팀을 만들고, 대회에 참가하세요!
          </p>
        </p>
        {!isLogin && (
          <button
            className="border border-white w-[180px] h-[56px] rounded-2xl bg-black text-white text-sm font-bold"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인 하러 가기
          </button>
        )}
      </div>
      <div className=" pt-2 max-lg:hidden">
        <img
          src={welcomeBanner}
          className=" max-w-[700px]"
          alt="welcome_banner"
        />
      </div>
    </div>
  );
};

export default Welcome;
