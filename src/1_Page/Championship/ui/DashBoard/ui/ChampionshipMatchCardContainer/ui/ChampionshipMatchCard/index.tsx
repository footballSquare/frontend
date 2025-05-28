import { matchState } from "../../../../../../../../4_Shared/constant/matchState";
import useChampionshipInfoContext from "../../../../../../model/useChampionshipInfoContext";
import { getTeamStyle } from "./lib/getStatusColor";
import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";
import useDeleteChampionshipMatchHandler from "./model/useDeleteChampionshipMatchHandler";
import usePutChampionshipMatchEndHandler from "./model/usePutChampionshipMatchEndHandler";

const ChampionshipMatchCard = (props: ChampionshipMatchCardProps) => {
  const {
    match,
    isSelected,
    handleSelect,
    handleDeleteMatch,
    handleEndMatch,
    handleCommitMatches,
    handleRollBackMatchByIdx,
  } = props;
  const home = match.championship_match_first;
  const away = match.championship_match_second;
  const isFinished = home.common_status_idx === 4;
  // admin
  const { isCommunityOperator, isCommunityManager, championshipListColor } =
    useChampionshipInfoContext();

  // api
  const { handleDeleteChampionshipMatch } = useDeleteChampionshipMatchHandler({
    handleDeleteMatch,
    handleCommitMatches,
    handleRollBackMatchByIdx,
  });
  const { handlePutChampionshipMatchEnd } = usePutChampionshipMatchEndHandler({
    handleEndMatch,
    handleCommitMatches,
    handleRollBackMatchByIdx,
  });

  const accentColor = championshipListColor || "#2563eb"; // default blue-600
  const accentText = getTextColorFromBackground(accentColor);

  return (
    <li
      onClick={() => handleSelect(match.championship_match_idx)}
      className={`relative flex flex-col w-full rounded-xl overflow-visible
        bg-gray-800 text-gray-100
        transform transition-all duration-200 hover:scale-102 hover:shadow-2xl
      `}
      style={{
        borderColor: isSelected ? accentColor : "transparent",
        borderWidth: isSelected ? 2 : 0,
      }}>
      {/* 상태 표시 배지 */}
      <div className="flex justify-end">
        <div
          className="mr-2 mt-2 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: isFinished ? accentColor : accentColor + "80", // 50% opaque for in-progress
            color: accentText,
          }}>
          {matchState[home.common_status_idx] || ""}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="pr-2 pl-2 sm:pl-4 pt-2 pb-3 flex flex-col items-center">
        {/* VS 영역 */}
        <div className="flex items-center justify-between mb-3 relative">
          {/* 홈팀 */}
          <div className="flex flex-col items-center w-2/5">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center mb-1"
              style={{ backgroundColor: accentColor + "20" }}>
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
              className={`text-sm font-semibold truncate max-w-full text-center ${getTeamStyle(
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
            className="flex items-center justify-center px-3 py-2 rounded-lg shadow-md"
            style={{ backgroundColor: accentColor, color: accentText }}>
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
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center mb-1"
              style={{ backgroundColor: accentColor + "20" }}>
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
              className={`text-sm font-semibold truncate max-w-full text-center ${getTeamStyle(
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
          <div className="flex justify-end gap-2 p-2 bg-gray-800/80 backdrop-blur-sm">
            <button
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?"))
                  handleDeleteChampionshipMatch(match.championship_match_idx);
              }}
              className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition-colors">
              삭제
            </button>
            <button
              onClick={() => {
                if (confirm("정말 종료하시겠습니까?")) {
                  handlePutChampionshipMatchEnd(match.championship_match_idx);
                }
              }}
              className="text-xs px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-800 transition-colors">
              경기종료
            </button>
          </div>
        ))}

      {/* 선택 표시기 */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ boxShadow: `0 0 0 2px ${accentColor}` }}
        />
      )}
    </li>
  );
};

export default ChampionshipMatchCard;
