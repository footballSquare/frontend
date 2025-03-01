import { UserInfoStats } from "./type";
import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";
import STYLE from "./style";

const AwardDashBoard = ({ userInfo }: { userInfo: UserInfoStats }) => {
  const { match_count = 0, winning_rate = 0, trophies = [] } = userInfo;

  return (
    <div className={STYLE.container}>
      {/* 제목 */}
      <h2 className={STYLE.title}>PLAY TO WIN</h2>
      <h1 className={STYLE.subtitle}>AWARD</h1>

      {/* 트로피 리스트 */}
      {trophies.length !== 0 && (
        <div className={STYLE.trophyList}>
          <AutoMoveAwardList awards={trophies} />
        </div>
      )}

      {/* 매치 정보 */}
      <div className={STYLE.matchInfoContainer}>
        <div className={STYLE.matchInfoBox}>
          <label className={STYLE.matchInfoLabel}>Match Count</label>
          <p className={STYLE.matchInfoValue}>{match_count}</p>
        </div>
        <div className={STYLE.matchInfoBox}>
          <label className={STYLE.matchInfoLabel}>Winning Rate</label>
          <p className={STYLE.matchInfoValue}>{winning_rate}%</p>
        </div>
      </div>

      {/* 어워드 리스트 */}
      <div className={STYLE.awardListContainer}>
        <h3 className={STYLE.awardListTitle}>AWARD LIST</h3>
        <div className={STYLE.awardListBox}>
          {trophies.length !== 0 &&
            trophies.map((award, index) => (
              <div key={index} className={STYLE.awardItem}>
                {/* 트로피 이미지 */}
                <img
                  src={award.championship_list_throphy_img}
                  alt={award.championship_list_name}
                  className={STYLE.awardImage}
                />

                {/* 텍스트 정보 */}
                <div className={STYLE.awardTextContainer}>
                  <h3 className={STYLE.awardName}>
                    {award.championship_list_name}
                  </h3>
                  <p className={STYLE.awardDate}>
                    {award.championship_list_start_date} ~{" "}
                    {award.championship_list_end_date}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AwardDashBoard;
