import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import AwardDashBoard from "./ui/AwardDashBoard/indes";
import PlayerDashBoard from "./ui/PlayerDashBoard";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userIdx } = useParams();
  const [userInfo] = useGetMyInfo(userIdx);
  const { winning_rate, trophies, match_count, ...playerProps } = userInfo;
  const awardProps = { winning_rate, trophies, match_count };

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
