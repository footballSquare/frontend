import STYLE from "./type";

import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import AwardDashBoard from "./ui/AwardDashBoard/indes";
import PlayerDashBoard from "./ui/PlayerDashBoard";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";

const Profile = () => {
  const [userIdx] = useValidParamInteger("userIdx");
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
        <AwardDashBoard awardInfo={awardProps} />
      </div>
    </main>
  );
};

export default Profile;
