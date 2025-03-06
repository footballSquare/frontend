import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import AwardDashBoard from "./ui/AwardDashBoard/indes";
import PlayerDashBoard from "./ui/PlayerDashBoard";

const Profile = () => {
  const [userIdx] = useValidParamInteger("userIdx");
  const [userInfo] = useGetMyInfo(userIdx);
  const { winning_rate, trophies, match_count, mmr, ...playerProps } = userInfo;
  const awardProps = { winning_rate, trophies, match_count, mmr };

  return (
    <main className="flex flex-wrap gap-4 w-full justify-center bg-white shadow-md rounded-lg p-4">
      {/* Player Dashboard */}
      <div className="w-[90%] sm:w-[55%] min-w-[300px]">
        <PlayerDashBoard userInfo={{ ...playerProps }} />
      </div>

      {/* Award Dashboard */}
      <div className="w-[90%] sm:w-[40%] min-w-[250px] bg-white shadow-md rounded-lg p-4">
        <AwardDashBoard awardInfo={awardProps} />
      </div>
    </main>
  );
};

export default Profile;
