import AdminBtnPanel from "./ui/AdminBtnPanel";
// state
import useToggleState from "../../../../4_Shared/model/useToggleState";
import { getTextColorFromBackground } from "../../../../4_Shared/lib/colorChecker";
import { matchType } from "../../../../4_Shared/constant/matchType";
import { championshipTypes } from "../../../../4_Shared/constant/championshipTypes";
import { formatDateKoreanDate } from "../../../../4_Shared/lib/dateFormatter";
import defaultTrophyImg from "../../../../4_Shared/assets/svg/rank.svg";
import { useMyCommunityRoleIdx } from "../../../../4_Shared/lib/useMyInfo";

const InfoHeader = (props: InfoHeaderProps) => {
  const { championshipInfo } = props;

  const isChampionshipEnd = championshipInfo.common_status_idx === 4;
  // 어드민
  const [community_role_idx] = useMyCommunityRoleIdx();
  const isAdmin = community_role_idx === 0;

  const [isHeaderCollapsed, toggleHeader] = useToggleState();
  const [isEndModalOpen, toggleEndModal] = useToggleState(true);

  return (
    <div>
      <header
        className={`relative rounded-lg shadow-md transition-all duration-300 overflow-hidden mb-4 ${
          isHeaderCollapsed ? "h-14" : ""
        }`}
        style={{
          backgroundColor: championshipInfo.championship_list_color,
          color: getTextColorFromBackground(
            championshipInfo.championship_list_color
          ),
        }}>
        {/* 장식용 원 요소들 (중앙 원 제거) */}
        <div className="absolute top-0 left-0 w-24 h-24 border-2 border-current rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-current rounded-full transform translate-x-1/2 translate-y-1/2 opacity-20"></div>

        {isHeaderCollapsed ? (
          <div className="h-full flex items-center px-4">
            <img
              className="w-6 h-6 mr-2"
              src={
                championshipInfo.championship_list_throphy_img ||
                defaultTrophyImg
              }
              alt="Trophy"
            />
            <h1 className="text-lg font-medium truncate">
              {championshipInfo.championship_list_name}
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full gap-3 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <img
                className="w-8 h-8 object-cover"
                src={
                  championshipInfo.championship_list_throphy_img ||
                  defaultTrophyImg
                }
                alt="Trophy"
              />
              <h1 className="text-xl font-bold">
                {championshipInfo.championship_list_name}
              </h1>
            </div>

            <div className="w-full flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 text-sm rounded-full border border-current bg-white/10 text-inherit">
                {`${formatDateKoreanDate(
                  new Date(championshipInfo.championship_list_start_date)
                )} ~ ${formatDateKoreanDate(
                  new Date(championshipInfo.championship_list_end_date)
                )}`}
              </span>
              <span className="px-3 py-1 text-sm rounded-full border border-current bg-white/10 text-inherit">
                {championshipTypes[championshipInfo.championship_type_idx]}
              </span>
              <span className="px-3 py-1 text-sm rounded-full border border-current bg-white/10 text-inherit">
                {matchType[championshipInfo.match_type_idx]}
              </span>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3 mt-1">
              <p className="text-sm text-inherit flex-1 bg-white/5 p-3 rounded-md max-h-20 overflow-y-auto">
                {championshipInfo.championship_list_description}
              </p>
              {isAdmin && !isChampionshipEnd && (
                <div className="flex gap-2 items-center justify-center">
                  <AdminBtnPanel championshipInfo={championshipInfo} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 중앙 하단에 위치한 접기/펼치기 버튼 */}
        {!isChampionshipEnd && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3">
            <button
              onClick={toggleHeader}
              className="w-10 h-10 flex items-center justify-center text-sm rounded-full bg-white shadow-lg hover:bg-gray-100 text-black"
              aria-label={isHeaderCollapsed ? "펼치기" : "접기"}>
              {isHeaderCollapsed ? "▼" : "▲"}
            </button>
          </div>
        )}
      </header>
      {isChampionshipEnd && (
        <div className="w-full p-3">
          <div
            className="w-full mt-2 p-3 rounded-md border border-white/20"
            style={{
              backgroundColor: championshipInfo.winner_team_color || "white",
              color: getTextColorFromBackground(
                championshipInfo.winner_team_color || "#ffffff"
              ),
            }}>
            <div className="flex items-center">
              <div className="relative mr-3">
                <span className="absolute -top-2 -left-1 text-lg">👑</span>
                <img
                  className="w-10 h-10 object-cover rounded-full border border-white/50 ml-1"
                  src={championshipInfo.winner_team_emblem || "placeholder.png"}
                  alt={`${championshipInfo.winner_team_name} 엠블럼`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                  WINNER
                </span>
                <span className="font-bold">
                  {championshipInfo.winner_team_name}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full py-1 text-center bg-black/40 text-white text-xs font-medium">
            대회 종료
          </div>
        </div>
      )}
      {/* 승자 모달 */}
      {isChampionshipEnd && isEndModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-xs w-full transform transition-all duration-300 scale-100 border border-gray-200 dark:border-gray-700">
            <div className="relative flex justify-center mb-4">
              <div className="text-4xl">🏆</div>
              <div className="absolute -top-2 -right-1 text-xl animate-bounce">
                ✨
              </div>
              <div className="absolute -top-1 -left-2 text-lg animate-bounce delay-100">
                ✨
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-600 dark:text-gray-300">
              축하합니다!
            </h2>
            {championshipInfo.winner_team_idx &&
              championshipInfo.winner_team_name &&
              championshipInfo.winner_team_emblem && (
                <div className="flex items-center justify-center mt-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                    src={championshipInfo.winner_team_emblem}
                    alt={`${championshipInfo.winner_team_name} 엠블럼`}
                  />
                  <div className="ml-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CHAMPION
                    </p>
                    <p className="font-bold">
                      {championshipInfo.winner_team_name}
                    </p>
                  </div>
                </div>
              )}
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
              대회가 종료되었습니다
            </p>
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              onClick={toggleEndModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoHeader;
