import profile from "../../../../4_Shared/assets/svg/profile.svg";
import field_img from "../../assets/img/field.png";
const FormationPanel = () => {
  return (
    <div
      className="w-[30%] p-4 flex flex-col gap-12 items-center"
      style={{
        backgroundImage: `url(${field_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 포메이션 종류 */}
      <label className=" flex flex-col text-xs font-semibold w-full">
        포메이션
        <div className=" w-[164px] h-[32px] rounded-[4px] flex justify-center items-center border-1 border-blue bg-white">
          4-3-3
        </div>
      </label>

      {/* st */}
      <div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
      </div>

      {/* ls rs */}
      <div className=" flex justify-around w-full">
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
      </div>

      {/* lcm cm rcm */}
      <div className=" flex gap-[50px]">
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
      </div>

      {/* lb lcb cb rcb rb */}
      <div className=" flex justify-around w-full">
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
      </div>
      
      {/* gk */}
      <div>
        <div>
          <div className="flex flex-col bg-white rounded-[32px] w-[36px] justify-center items-center">
            <img src={profile} alt="profile" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationPanel;
