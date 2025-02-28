import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import AwardDashBoard from "./ui/AwardDashBoard/indes";
import PlayerDashBoard from "./ui/PlayerDashBoard";

const Profile = () => {
  const [userInfo] = useGetMyInfo();

  return (
    <main className="flex flex-wrap gap-4 w-full justify-center bg-white shadow-md rounded-lg p-4">
      {/* Player Dashboard */}
      <div className="w-[90%] sm:w-[55%] min-w-[300px] ">
        <PlayerDashBoard userInfo={userInfo} />
      </div>

      {/* Award Dashboard */}
      <div className="w-[90%] sm:w-[40%] min-w-[250px] bg-white shadow-md rounded-lg p-4">
        <AwardDashBoard userInfo={userInfo} />
      </div>
    </main>
  );
};

export default Profile;
