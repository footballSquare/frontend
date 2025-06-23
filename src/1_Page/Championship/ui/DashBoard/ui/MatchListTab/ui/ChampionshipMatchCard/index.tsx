import React from "react";
import { utcFormatter } from "../../../../../../../../4_Shared/lib/utcFormatter";
import useDeleteChampionshipMatchHandler from "./model/useDeleteChampionshipMatchHandler";
import usePutChampionshipMatchEndHandler from "./model/usePutChampionshipMatchEndHandler";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";

const ChampionshipMatchCard = (props: ChampionshipMatchCardProps) => {
  const {
    match,
    isMyTeam = false,
    isSelected = false,
    handleMatchSelect,
    handleCommitMatches,
    handleRollBackMatchByIdx,
    handleEndMatch,
    handleDeleteMatch,
  } = props;

  const { isCommunityManager, isCommunityOperator, championshipListColor } =
    useChampionshipInfoContext();

  // api - 기존 로직이 있으면 사용 (optional로 처리)
  const { handleDeleteChampionshipMatch } = useDeleteChampionshipMatchHandler({
    handleCommitMatches,
    handleDeleteMatch,
    handleRollBackMatchByIdx,
  });

  const { handlePutChampionshipMatchEnd } = usePutChampionshipMatchEndHandler({
    handleEndMatch,
    handleCommitMatches,
    handleRollBackMatchByIdx,
  });

  return (
    <div
      onClick={() => handleMatchSelect(match.championship_match_idx)}
      className={`group relative cursor-pointer transition-all duration-300 ${
        isMyTeam
          ? `w-64 flex-shrink-0 hover:scale-[1.02] ${
              isSelected ? "ring-2 ring-opacity-60" : ""
            }`
          : `bg-white/5 rounded-2xl p-4 hover:bg-white/10 border border-white/10 hover:border-white/20 ${
              isSelected ? `ring-2 bg-white/10 border-white/40` : ""
            }`
      }`}
      style={
        isSelected
          ? ({
              "--tw-ring-color": `${championshipListColor}99`,
              ...(isMyTeam
                ? {}
                : {
                    backgroundColor: `${championshipListColor}1A`,
                    borderColor: `${championshipListColor}66`,
                  }),
            } as React.CSSProperties)
          : undefined
      }>
      {isMyTeam ? (
        /* 내 팀 매치 카드 스타일 */
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* 매치 날짜 및 시간, 상태 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <div className="text-xs text-gray-400 font-medium">
                {utcFormatter(match.match_match_start_time)}
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                match.championship_match_first.common_status_idx === 4
                  ? "text-white"
                  : "bg-amber-500/20 text-amber-200"
              }`}
              style={
                match.championship_match_first.common_status_idx === 4
                  ? {
                      backgroundColor: `${championshipListColor}33`,
                      color: championshipListColor,
                    }
                  : undefined
              }>
              {match.championship_match_first.common_status_idx === 4
                ? "종료"
                : "예정"}
            </div>
          </div>

          {/* 팀 정보 및 점수 */}
          <div className="space-y-2">
            {/* 홈팀 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0">
                  {match.championship_match_first.team_list_emblem ? (
                    <img
                      src={match.championship_match_first.team_list_emblem}
                      alt="홈팀"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        backgroundColor:
                          match.championship_match_first.team_list_color,
                      }}>
                      {match.championship_match_first.team_list_short_name}
                    </div>
                  )}
                </div>
                <div className="text-white font-medium text-sm truncate">
                  {match.championship_match_first.team_list_name}
                </div>
              </div>
              <div className="text-lg font-bold text-white">
                {match.championship_match_first.match_team_stats_our_score || 0}
              </div>
            </div>

            {/* VS 구분선 */}
            <div className="flex items-center justify-center py-1">
              <div className="text-gray-500 text-xs font-medium">VS</div>
            </div>

            {/* 어웨이팀 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0">
                  {match.championship_match_second.team_list_emblem ? (
                    <img
                      src={match.championship_match_second.team_list_emblem}
                      alt="어웨이팀"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        backgroundColor:
                          match.championship_match_second.team_list_color,
                      }}>
                      {match.championship_match_second.team_list_short_name}
                    </div>
                  )}
                </div>
                <div className="text-white font-medium text-sm truncate">
                  {match.championship_match_second.team_list_name}
                </div>
              </div>
              <div className="text-lg font-bold text-white">
                {match.championship_match_second.match_team_stats_our_score ||
                  0}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 일반 매치 리스트 카드 스타일 */
        <>
          {/* 매치 시간 및 상태 */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-400">
              {new Date(match.match_match_start_time).toLocaleTimeString(
                "ko-KR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                match.championship_match_first.common_status_idx === 4
                  ? "text-white"
                  : "bg-amber-500/20 text-amber-200"
              }`}
              style={
                match.championship_match_first.common_status_idx === 4
                  ? {
                      backgroundColor: `${championshipListColor}33`,
                      color: championshipListColor,
                    }
                  : undefined
              }>
              {match.championship_match_first.common_status_idx === 4
                ? "종료"
                : "예정"}
            </div>
          </div>

          {/* 팀 정보 및 점수 */}
          <div className="flex items-center justify-between">
            {/* 홈팀 */}
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                {match.championship_match_first.team_list_emblem ? (
                  <img
                    src={match.championship_match_first.team_list_emblem}
                    alt="홈팀"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      backgroundColor:
                        match.championship_match_first.team_list_color,
                    }}>
                    {match.championship_match_first.team_list_short_name}
                  </div>
                )}
              </div>
              <div className="text-white font-medium text-left">
                {match.championship_match_first.team_list_name}
              </div>
            </div>

            {/* 점수 */}
            <div className="flex items-center space-x-4 mx-6">
              <div className="text-2xl font-bold text-white">
                {match.championship_match_first.match_team_stats_our_score || 0}
              </div>
              <div className="text-gray-500">-</div>
              <div className="text-2xl font-bold text-white">
                {match.championship_match_second.match_team_stats_our_score ||
                  0}
              </div>
            </div>

            {/* 어웨이팀 */}
            <div className="flex items-center space-x-3 flex-1 justify-end">
              <div className="text-white font-medium text-right">
                {match.championship_match_second.team_list_name}
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                {match.championship_match_second.team_list_emblem ? (
                  <img
                    src={match.championship_match_second.team_list_emblem}
                    alt="어웨이팀"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      backgroundColor:
                        match.championship_match_second.team_list_color,
                    }}>
                    {match.championship_match_second.team_list_short_name}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 호버 효과 및 관리자 버튼 */}
          {(isCommunityOperator || isCommunityManager) &&
            match.championship_match_first.common_status_idx !== 4 && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("정말 삭제하시겠습니까?")) {
                      handleDeleteChampionshipMatch(
                        match.championship_match_idx
                      );
                    }
                  }}
                  className="w-6 h-6 rounded-full bg-red-500/80 text-white text-xs hover:bg-red-600 transition-colors">
                  ×
                </button>
                {
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("정말 종료하시겠습니까?")) {
                        handlePutChampionshipMatchEnd(
                          match.championship_match_idx
                        );
                      }
                    }}
                    className="w-6 h-6 rounded-full bg-gray-600/80 text-white text-xs hover:bg-gray-700 transition-colors">
                    종료
                  </button>
                }
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default ChampionshipMatchCard;
