import AwardDashBoard from "./ui/AwardDashBoard/indes";
import PlayerDashBoard from "./ui/PlayerDashBoard";
import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import PlayerCard from "../../2_Widget/PlayerCard";

const Profile = () => {
  const [userIdx] = useValidParamInteger("userIdx");
  const [userInfo] = useGetMyInfo(userIdx);
  const { Awards, mmr, ...playerProps } = userInfo;
  const awardProps = { Awards, mmr };
  return (
    <main className="flex flex-wrap gap-1 w-full justify-center">
      {/* Player Dashboard */}

      <div className="hidden lg:block w-[20%] max-w-[240px]">
        <PlayerCard {...playerProps} />
      </div>

      <div className="w-[90%] sm:w-[40%] min-w-[300px] max-w-sm">
        <PlayerDashBoard {...playerProps} />
      </div>

      {/* Award Dashboard */}
      <div className="w-[90%] sm:w-[40%] min-w-[300px] max-w-sm">
        <AwardDashBoard {...awardProps} />
      </div>
    </main>
  );
};

export default Profile;
