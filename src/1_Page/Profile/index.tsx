import STYLE from "./type";

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
    <main className={STYLE.main}>
      {/* Player Dashboard */}
      <div className={STYLE.playerDashboard}>
        <PlayerDashBoard userInfo={{ ...playerProps }} />
      </div>

      {/* Award Dashboard */}
      <div className={STYLE.awardDashboard}>
        <AwardDashBoard userInfo={awardProps} />
      </div>
    </main>
  );
};

export default Profile;
