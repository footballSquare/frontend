import welcomeBanner from "../../4_Shared/assets/img/welcomeBanner.png"
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className="flex flex-col">
        <p className=" font-bold text-6xl mt-[100px]">
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
        <button
          className="border-1 w-[180px] h-[56px] rounded-2xl bg-black text-white font-bold"
          onClick={() => {
            navigate("/login");
          }}
        >
          Get Start
        </button>
      </div>
      <div className=" pt-2">
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
