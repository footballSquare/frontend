import STYLE from "./type";

import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import AwardDashBoard from "./ui/AwardDashBoard/indes";
import PlayerDashBoard from "./ui/PlayerDashBoard";

const Profile = () => {
  const [userInfo] = useGetMyInfo();

  return (
    <main className={STYLE.main}>
      {/* Player Dashboard */}
      <div className={STYLE.playerDashboard}>
        <PlayerDashBoard userInfo={userInfo} />
      </div>

      {/* Award Dashboard */}
      <div className={STYLE.awardDashboard}>
        <AwardDashBoard userInfo={userInfo} />
      </div>
    </main>
  );
};

export default Profile;
