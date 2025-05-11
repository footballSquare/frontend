import useDeleteChampionshipMatch from "../../../../../../../../3_Entity/Championship/useDeleteChampionshipMatch";
import usePutChampionshipMatchEnd from "../../../../../../../../3_Entity/Championship/usePutChampionshipMatchEnd";
import { matchState } from "../../../../../../../../4_Shared/constant/matchState";
import { useCommunityRole } from "../../../../../../model/useCommunityContext";
import { getStatusColors, getTeamStyle } from "./lib/getStatusColor";

const ChampionshipMatchCard = (props: ChampionshipMatchCardProps) => {
  const { match, isSelected, handleSelect, handleDeleteMatch, handleEndMatch } =
    props;
  const home = match.championship_match_first;
  const away = match.championship_match_second;

  // admin
  const { isCommunityOperator, isCommunityManager } = useCommunityRole();

  // 경기 종료 여부 (common_status_idx === 4)
  const isFinished = home.common_status_idx === 4;
  // api
  const [deleteChampionshipMatch] = useDeleteChampionshipMatch();
  const [putChampionshipMatchEnd] = usePutChampionshipMatchEnd();

  const colors = getStatusColors(isFinished, home.common_status_idx);
  return (
    <li
      onClick={() => handleSelect(match.championship_match_idx)}
      className={`relative flex flex-col w-full rounded-xl overflow-hidden shadow-md backdrop-blur-sm
        ${colors.bgColor} ${colors.textColor}
        transform transition-all duration-300 hover:scale-105 hover:shadow-lg
        ${isSelected ? `ring-2 ring-offset-2 ring-blue-500 shadow-lg` : ""}`}>
      {/* 상태 표시 배지 */}
      <div
        className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium z-10"
        style={{
          backgroundColor: isFinished
            ? "#374151"
            : home.common_status_idx === 3
            ? "#1d4ed8"
            : home.common_status_idx === 0
            ? "#059669"
            : "#6b7280",
          color: "#ffffff",
        }}>
        {matchState[home.common_status_idx] || ""}
      </div>

      {/* 메인 콘텐츠 */}
      <div className="p-3 sm:p-4">
        {/* VS 영역 */}
        <div className="flex items-center justify-between mb-3 relative">
          {/* 홈팀 */}
          <div className="flex flex-col items-center w-2/5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center mb-1">
              {home.team_list_emblem ? (
                <img
                  src={home.team_list_emblem}
                  alt={`${home.team_list_name} 엠블럼`}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded-full"
                />
              ) : (
                <span className="text-xs font-bold text-gray-800">
                  {home.team_list_short_name?.charAt(0) || "H"}
                </span>
              )}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium truncate max-w-full text-center ${getTeamStyle(
                true,
                isFinished,
                home
              )}`}>
              <span className="hidden sm:inline">{home.team_list_name}</span>
              <span className="inline sm:hidden">
                {home.team_list_short_name}
              </span>
            </span>
          </div>

          {/* 점수 */}
          <div
            className={`flex items-center justify-center px-2 py-1 sm:py-2 rounded-lg ${colors.scoreBoxBg} text-white font-bold`}>
            <span className="text-lg sm:text-xl">
              {home.match_team_stats_our_score}
            </span>
            <span className="mx-1 sm:mx-2 opacity-70">:</span>
            <span className="text-lg sm:text-xl">
              {away.match_team_stats_our_score}
            </span>
          </div>

          {/* 어웨이팀 */}
          <div className="flex flex-col items-center w-2/5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center mb-1">
              {away.team_list_emblem ? (
                <img
                  src={away.team_list_emblem}
                  alt={`${away.team_list_name} 엠블럼`}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded-full"
                />
              ) : (
                <span className="text-xs font-bold text-gray-800">
                  {away.team_list_short_name?.charAt(0) || "A"}
                </span>
              )}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium truncate max-w-full text-center ${getTeamStyle(
                false,
                isFinished,
                home
              )}`}>
              <span className="hidden sm:inline">{away.team_list_name}</span>
              <span className="inline sm:hidden">
                {away.team_list_short_name}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 관리자 버튼 영역 */}
      {isCommunityOperator ||
        (isCommunityManager && !isFinished && (
          <div className="flex justify-end gap-2 p-2 bg-black/5 backdrop-blur-sm">
            <button
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  deleteChampionshipMatch(match.championship_match_idx);
                  handleDeleteMatch(match.championship_match_idx);
                }
              }}
              className="text-xs px-2 py-1 rounded bg-red-500/90 text-white hover:bg-red-600 transition-colors">
              삭제
            </button>
            <button
              onClick={() => {
                if (confirm("정말 종료하시겠습니까?")) {
                  putChampionshipMatchEnd(match.championship_match_idx);
                  handleEndMatch(match.championship_match_idx);
                }
              }}
              className="text-xs px-2 py-1 rounded bg-gray-700/90 text-white hover:bg-gray-800 transition-colors">
              경기종료
            </button>
          </div>
        ))}

      {/* 선택 표시기 */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"></div>
      )}
    </li>
  );
};

export default ChampionshipMatchCard;
