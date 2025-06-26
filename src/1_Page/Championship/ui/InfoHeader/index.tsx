import AdminBtnPanel from "./ui/AdminBtnPanel";

import useToggleState from "../../../../4_Shared/model/useToggleState";
import { getTextColorFromBackground } from "../../../../4_Shared/lib/colorChecker";
import { matchType } from "../../../../4_Shared/constant/matchType";
import { championshipTypes } from "../../../../4_Shared/constant/championshipTypes";
import defaultTrophyImg from "../../../../4_Shared/assets/svg/rank.svg";
import useChampionshipInfoContext from "../../../../4_Shared/model/useChampionshipInfoContext";
import { utcFormatter } from "../../../../4_Shared/lib/utcFormatter";
import DefaultTeamEmblem from "../../../../4_Shared/components/DefaultTeamEmblem";

const InfoHeader = (props: InfoHeaderProps) => {
  const { championshipInfo } = props;

  const isChampionshipEnd = championshipInfo.common_status_idx === 4;
  const { isCommunityManager, championshipListColor } =
    useChampionshipInfoContext();

  const [isHeaderCollapsed, toggleHeader] = useToggleState();
  const [isEndModalOpen, toggleEndModal] = useToggleState(true);

  return (
    <div>
      <header
        className={`rounded-xl bg-gray-800 text-gray-100 border border-gray-700/80 shadow-md transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="flex items-center justify-between w-full h-16 px-4 sm:px-6">
          <div className="flex items-center gap-3 truncate">
            <img
              className="w-9 h-9 object-cover rounded-lg border-2 flex-shrink-0"
              style={{ borderColor: championshipListColor }}
              src={
                championshipInfo.championship_list_throphy_img ||
                defaultTrophyImg
              }
              alt="Trophy"
            />
            <h1 className="text-lg font-bold tracking-wide text-white truncate">
              {championshipInfo.championship_list_name}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isCommunityManager && !isChampionshipEnd && (
              <AdminBtnPanel championshipInfo={championshipInfo} />
            )}

            {!isChampionshipEnd && (
              <button
                onClick={toggleHeader}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-sm rounded-lg bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 hover:text-white border border-gray-600/80 transition-all"
                aria-label={isHeaderCollapsed ? "펼치기" : "접기"}>
                <span
                  className={`transform transition-transform duration-300 ${
                    isHeaderCollapsed ? "rotate-0" : "rotate-180"
                  }`}>
                  ▼
                </span>
              </button>
            )}
          </div>
        </div>

        {!isHeaderCollapsed && (
          <div className="px-4 sm:px-6 pb-4 pt-2">
            <div className="w-full flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                📅{" "}
                {`${utcFormatter(
                  championshipInfo.championship_list_start_date
                )} ~ ${utcFormatter(
                  championshipInfo.championship_list_end_date
                )}`}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                🏆 {championshipTypes[championshipInfo.championship_type_idx]}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                ⚽ {matchType[championshipInfo.match_type_idx]}
              </span>
            </div>
            <div className="bg-gray-900/70 p-3 rounded-lg">
              <p className="text-sm text-gray-300 max-h-24 overflow-y-auto">
                {championshipInfo.championship_list_description}
              </p>
            </div>
          </div>
        )}
      </header>
      {isChampionshipEnd && (
        <div className="w-full p-4">
          <div
            className="w-full mt-3 p-4 rounded-xl border border-white/30 shadow-2xl backdrop-blur-sm"
            style={{
              backgroundColor: championshipInfo.winner_team_color
                ? `${championshipInfo.winner_team_color}E6`
                : "white",
              color: getTextColorFromBackground(
                championshipInfo.winner_team_color || "#ffffff"
              ),
            }}>
            <div className="flex items-center">
              <div className="relative mr-4">
                <span className="absolute -top-3 -left-2 text-2xl animate-bounce">
                  👑
                </span>
                {championshipInfo.winner_team_emblem ? (
                  <img
                    className="w-12 h-12 object-cover rounded-xl border-2 border-white/50 ml-2 shadow-lg"
                    src={
                      championshipInfo.winner_team_emblem || "placeholder.png"
                    }
                  />
                ) : (
                  <DefaultTeamEmblem
                    text={championshipInfo.winner_team_name || "팀"}
                    bgColor={championshipInfo.winner_team_color || "#ffffff"}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1">
                  🏆 CHAMPION
                </span>
                <span className="font-black text-lg">
                  {championshipInfo.winner_team_name}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full py-3 mt-3 text-center bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white text-sm font-bold rounded-xl shadow-xl flex items-center justify-center space-x-3 border border-gray-500">
            <span className="text-lg">🎉</span>
            <span className="uppercase tracking-wide">대회 종료</span>
            <span className="text-lg">🎉</span>
          </div>
        </div>
      )}
      {/* 모던한 승자 축하 모달 */}
      {isChampionshipEnd && isEndModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/70 backdrop-blur-md flex items-center justify-center">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-500 scale-100 border border-gray-600/50 backdrop-blur-sm">
            <div className="relative flex justify-center mb-6">
              <div className="text-6xl filter drop-shadow-lg">🏆</div>
              <div className="absolute -top-3 -right-2 text-2xl animate-bounce">
                ✨
              </div>
              <div className="absolute -top-2 -left-3 text-xl animate-bounce delay-100">
                ✨
              </div>
              <div className="absolute top-1 right-1 text-lg animate-bounce delay-200">
                ⭐
              </div>
            </div>
            <h2 className="text-3xl font-black text-center bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-2">
              축하합니다!
            </h2>
            <p className="text-center text-gray-400 mb-6 text-sm">
              새로운 챔피언이 탄생했습니다
            </p>
            {championshipInfo.winner_team_idx &&
              championshipInfo.winner_team_name &&
              championshipInfo.winner_team_emblem && (
                <div className="flex items-center justify-center mt-4 p-4 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-xl backdrop-blur-sm border border-gray-600/30">
                  <img
                    className="w-14 h-14 object-cover rounded-xl border-2 border-yellow-400/50 shadow-lg"
                    src={championshipInfo.winner_team_emblem}
                    alt={`${championshipInfo.winner_team_name} 엠블럼`}
                  />
                  <div className="ml-4">
                    <p className="text-xs text-yellow-400 uppercase tracking-wider font-bold mb-1">
                      🏆 CHAMPION
                    </p>
                    <p className="font-black text-lg text-white">
                      {championshipInfo.winner_team_name}
                    </p>
                  </div>
                </div>
              )}
            <p className="mt-6 text-center text-sm text-gray-400">
              대회가 성공적으로 종료되었습니다
            </p>
            <button
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={toggleEndModal}>
              확인
            </button>
          </div>
        </div>
      )}
      <hr className="border-t border-gray-600/50 mt-4" />
    </div>
  );
};

export default InfoHeader;
