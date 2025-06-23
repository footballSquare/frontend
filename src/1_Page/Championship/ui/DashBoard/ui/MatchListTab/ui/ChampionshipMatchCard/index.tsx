import { getTeamStyle } from "./lib/getStatusColor";
import useDeleteChampionshipMatchHandler from "./model/useDeleteChampionshipMatchHandler";
import usePutChampionshipMatchEndHandler from "./model/usePutChampionshipMatchEndHandler";
import DefaultTeamEmblem from "../../../../../../../../4_Shared/components/DefaultTeamEmblem";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import { matchState } from "../../../../../../../../4_Shared/constant/matchState";

const ChampionshipMatchCard = (props: ChampionshipMatchCardProps) => {
  const {
    match,
    isSelected,
    handleSelect,
    handleDeleteMatch,
    handleEndMatch,
    handleCommitMatches,
    handleRollBackMatchByIdx,
    isListViewMode = false,
  } = props;
  const home = match.championship_match_first;
  const away = match.championship_match_second;
  const isFinished = home.common_status_idx === 4;
  // admin
  const { isCommunityOperator, isCommunityManager } =
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

  // 점수 비교를 위한 안전한 값
  const homeScore = home.match_team_stats_our_score || 0;
  const awayScore = away.match_team_stats_our_score || 0;

  // MOD: 승/패/무에 따른 배경색 결정
  const getMatchResultBg = () => {
    if (!isFinished) return "bg-white/10";
    if (homeScore > awayScore) return "bg-green-700/70"; // 홈팀 승리
    if (homeScore < awayScore) return "bg-red-700/70"; // 어웨이팀 승리
    return "bg-yellow-700/70"; // 무승부
  };

  // MOD: 날짜/시간 포맷팅 함수 (임시로 현재 날짜 사용)
  const formatMatchDateTime = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes().toString().padStart(2, "0");
    return `${month}/${day} ${hour}:${minute}`;
  };

  return (
    <div
      onClick={() => handleSelect(match.championship_match_idx)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out backdrop-blur-sm
        ${
          isListViewMode
            ? `${getMatchResultBg()} hover:bg-white/15 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border border-white/20 hover:border-white/30`
            : `${getMatchResultBg()} hover:bg-white/15 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20 hover:border-white/30`
        }
        ${
          isSelected
            ? "ring-2 ring-grass/60 shadow-grass/25 bg-grass/10 border-grass/40"
            : ""
        }
      `}>
      {/* 글로우 효과 */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-grass/5 via-grass/5 to-grass/5 animate-pulse rounded-2xl" />
      )}

      {/* 상단 헤더 */}
      <div className="relative px-4 py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-grass rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-white tracking-wide uppercase">
              Match #{match.championship_match_idx}
            </span>
          </div>
          {/* MOD: 날짜/시간을 큰 서체로 표시 */}
          <div className="text-right">
            <div className="text-lg font-bold text-white">
              {formatMatchDateTime()}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md
                ${
                  isFinished
                    ? "bg-grass/20 text-grass border border-grass/30"
                    : "bg-amber-500/20 text-amber-200 border border-amber-500/30"
                }
              `}>
              {matchState[home.common_status_idx] || "대기중"}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative p-4">
        {/* 팀 vs 팀 */}
        <div className="flex items-center justify-between gap-4">
          {/* 홈팀 */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                {home.team_list_emblem ? (
                  <img
                    src={home.team_list_emblem}
                    alt={`${home.team_list_name} 엠블럼`}
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                ) : (
                  <DefaultTeamEmblem
                    text={home.team_list_short_name}
                    bgColor={home.team_list_color}
                  />
                )}
                {/* 승리 표시 */}
                {isFinished && homeScore > awayScore && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-grass to-grass/80 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs">👑</span>
                  </div>
                )}
              </div>
            </div>
            <h3
              className={`font-bold text-sm mb-1 transition-colors duration-300
              ${getTeamStyle(true, isFinished, home)} 
              ${isSelected ? "text-grass" : "text-white"}
            `}>
              {isListViewMode ? home.team_list_name : home.team_list_short_name}
            </h3>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Home
            </p>
          </div>

          {/* 점수 및 VS */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-widest">
              VS
            </div>
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-xl shadow-lg transition-all duration-300 border
              ${
                isFinished
                  ? "bg-grass/10 border-grass/20"
                  : "bg-white/5 border-white/20"
              }
            `}>
              <span className="text-2xl font-black text-white">
                {homeScore}
              </span>
              <div className="w-1 h-6 bg-gradient-to-b from-grass to-grass/80 rounded-full" />
              <span className="text-2xl font-black text-white">
                {awayScore}
              </span>
            </div>
          </div>

          {/* 어웨이팀 */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                {away.team_list_emblem ? (
                  <img
                    src={away.team_list_emblem}
                    alt={`${away.team_list_name} 엠블럼`}
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                ) : (
                  <DefaultTeamEmblem
                    text={away.team_list_short_name}
                    bgColor={away.team_list_color}
                  />
                )}
                {/* 승리 표시 */}
                {isFinished && awayScore > homeScore && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-grass to-grass/80 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs">👑</span>
                  </div>
                )}
              </div>
            </div>
            <h3
              className={`font-bold text-sm mb-1 transition-colors duration-300
              ${getTeamStyle(false, isFinished, home)}
              ${isSelected ? "text-grass" : "text-white"}
            `}>
              {isListViewMode ? away.team_list_name : away.team_list_short_name}
            </h3>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Away
            </p>
          </div>
        </div>

        {/* 하단 정보 - MOD: 간소화 */}
        {isListViewMode && (
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-center text-xs">
              <span className="text-gray-400">
                팀 상세 정보를 보려면 클릭하세요
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 관리자 버튼 영역 */}
      {(isCommunityOperator || isCommunityManager) && !isFinished && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("정말 삭제하시겠습니까?"))
                handleDeleteChampionshipMatch(match.championship_match_idx);
            }}
            className="w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-600 transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110">
            <span className="text-xs">🗑️</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("정말 종료하시겠습니까?")) {
                handlePutChampionshipMatchEnd(match.championship_match_idx);
              }
            }}
            className="w-8 h-8 rounded-full bg-gray-600/80 backdrop-blur-sm text-white hover:bg-gray-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110">
            <span className="text-xs">⏹️</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChampionshipMatchCard;
