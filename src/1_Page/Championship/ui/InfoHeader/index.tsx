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
  // 어드민
  const { isCommunityManager, championshipListColor } =
    useChampionshipInfoContext();

  const [isHeaderCollapsed, toggleHeader] = useToggleState();
  const [isEndModalOpen, toggleEndModal] = useToggleState(true);

  return (
    <div>
      <header
        className={`relative rounded-xl shadow-2xl transition-all duration-500 overflow-hidden ${
          isHeaderCollapsed ? "h-16" : ""
        } bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 border border-gray-700/50`}>
        {/* 모던한 배경 패턴 */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${championshipListColor} 0%, transparent 50%), 
              radial-gradient(circle at 75% 75%, ${championshipListColor} 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* 글래스모피즘 장식 요소 */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-60px] left-[-60px] w-32 h-32 rounded-full border border-white/10 backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${championshipListColor}20, transparent)`,
            }}
          />
          <div
            className="absolute bottom-[-60px] right-[-60px] w-32 h-32 rounded-full border border-white/10 backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${championshipListColor}20, transparent)`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-2 rounded-full opacity-10"
            style={{ backgroundColor: championshipListColor }}
          />
        </div>

        {isHeaderCollapsed ? (
          <div className="h-full flex items-center justify-between px-6 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  className="w-8 h-8 object-cover rounded-lg shadow-lg border-2"
                  style={{ borderColor: championshipListColor }}
                  src={
                    championshipInfo.championship_list_throphy_img ||
                    defaultTrophyImg
                  }
                  alt="Trophy"
                />
                <div
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full"
                  style={{ backgroundColor: championshipListColor }}
                />
              </div>
              <h1 className="text-xl font-bold tracking-wide truncate bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {championshipInfo.championship_list_name}
              </h1>
            </div>
            {/* 접힌 상태에서 관리자 버튼들 */}
            {isCommunityManager && !isChampionshipEnd && (
              <div className="flex gap-2 items-center mr-14">
                <AdminBtnPanel championshipInfo={championshipInfo} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full gap-4 p-6 relative z-10">
            <div className="flex items-center space-x-4 mb-2">
              <div className="relative group">
                <img
                  className="w-12 h-12 object-cover rounded-xl shadow-2xl border-2 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    borderColor: championshipListColor,
                  }}
                  src={
                    championshipInfo.championship_list_throphy_img ||
                    defaultTrophyImg
                  }
                  alt="Trophy"
                />
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: championshipListColor }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </div>
              <h1 className="text-3xl font-black tracking-wide text-center bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {championshipInfo.championship_list_name}
              </h1>
            </div>

            <div className="w-full flex flex-wrap justify-center gap-2">
              <span className="px-4 py-2 text-sm rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-inherit shadow-lg hover:bg-white/20 transition-all duration-300">
                📅{" "}
                {`${utcFormatter(
                  championshipInfo.championship_list_start_date
                )} ~ ${utcFormatter(
                  championshipInfo.championship_list_end_date
                )}`}
              </span>
              <span className="px-4 py-2 text-sm rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-inherit shadow-lg hover:bg-white/20 transition-all duration-300">
                🏆 {championshipTypes[championshipInfo.championship_type_idx]}
              </span>
              <span className="px-4 py-2 text-sm rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-inherit shadow-lg hover:bg-white/20 transition-all duration-300">
                ⚽ {matchType[championshipInfo.match_type_idx]}
              </span>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex-1 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                <p className="text-sm text-inherit max-h-20 overflow-y-auto">
                  {championshipInfo.championship_list_description}
                </p>
              </div>
              {isCommunityManager && !isChampionshipEnd && (
                <div className="flex gap-3 items-center justify-center">
                  <AdminBtnPanel championshipInfo={championshipInfo} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 적당히 눈에 띄는 접기/펼치기 버튼 - 우상단 모서리 */}
        {!isChampionshipEnd && (
          <button
            onClick={toggleHeader}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-sm rounded-lg bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/80 text-gray-300 hover:text-white border border-gray-600/40 hover:border-gray-500/60 transition-all duration-300 hover:scale-105 group cursor-pointer z-50 shadow-lg"
            aria-label={isHeaderCollapsed ? "펼치기" : "접기"}>
            <span className="transition-transform duration-300 group-hover:scale-110 pointer-events-none">
              {isHeaderCollapsed ? "▼" : "▲"}
            </span>
          </button>
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">
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
