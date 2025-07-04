import { utcFormatter } from "../../../../../../../../4_Shared/lib/utcFormatter";
import useDeleteChampionshipMatchHandler from "./model/useDeleteChampionshipMatchHandler";
import usePutChampionshipMatchEndHandler from "./model/usePutChampionshipMatchEndHandler";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import DefaultTeamEmblem from "../../../../../../../../4_Shared/components/DefaultTeamEmblem";

const ChampionshipMatchCard = (props: ChampionshipMatchCardProps) => {
  const {
    match,
    handleMatchSelect,
    handleCommitMatches,
    handleRollBackMatchByIdx,
    handleEndMatch,
    handleDeleteMatch,
  } = props;
  const isMyTeam = match.isMyTeamMatch;

  const {
    championship_match_idx,
    match_match_start_time,
    championship_match_first,
    championship_match_second,
  } = match;

  // 두 팀 정보를 한 번에 구조 분해
  const {
    team_list_emblem: firstEmblem,
    team_list_short_name: firstShortName,
    team_list_name: firstName,
    team_list_color: firstColor,
    match_team_stats_our_score: firstScore = 0,
  } = championship_match_first;

  const {
    team_list_emblem: secondEmblem,
    team_list_short_name: secondShortName,
    team_list_name: secondName,
    team_list_color: secondColor,
    match_team_stats_our_score: secondScore = 0,
  } = championship_match_second;

  const isEndMatch = championship_match_first?.common_status_idx === 4;

  const { isCommunityManager, isCommunityOperator } =
    useChampionshipInfoContext();

  // api
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
      onClick={() => handleMatchSelect(championship_match_idx)}
      className={`relative cursor-pointer p-4 rounded-lg transition-colors bg-white/5 border border-white/10 hover:bg-white/10 `}>
      {/* 내 팀 배지 */}

      {/* 매치 정보 */}
      <div className="space-y-3">
        {/* 시간 및 상태 */}
        <div className={`flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {isMyTeam && (
              <div className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-bold">
                내 팀
              </div>
            )}
            <div className="text-sm text-gray-400">
              {utcFormatter(match_match_start_time)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`px-2 py-1 rounded text-xs ${
                isEndMatch
                  ? "bg-green-500/20 text-green-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}>
              {isEndMatch ? "종료" : "예정"}
            </div>
            {/* 관리자 버튼 - 우측 상단 */}
            {(isCommunityOperator || isCommunityManager) && !isEndMatch && (
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("정말 종료하시겠습니까?")) {
                      handlePutChampionshipMatchEnd(championship_match_idx);
                    }
                  }}
                  className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                  종료
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("정말 삭제하시겠습니까?")) {
                      handleDeleteChampionshipMatch(championship_match_idx);
                    }
                  }}
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 팀 정보 */}
        <div className="space-y-2">
          {/* 홈팀 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                {firstEmblem ? (
                  <img
                    src={firstEmblem}
                    alt="홈팀"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DefaultTeamEmblem
                    bgColor={firstColor}
                    text={firstShortName}
                  />
                )}
              </div>
              <span className="text-white">{firstName}</span>
            </div>
            <span className="text-white font-bold">{firstScore || 0}</span>
          </div>

          {/* VS */}
          <div className="text-center text-gray-500 text-xs">VS</div>

          {/* 어웨이팀 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                {secondEmblem ? (
                  <img
                    src={secondEmblem}
                    alt="어웨이팀"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DefaultTeamEmblem
                    bgColor={secondColor}
                    text={secondShortName}
                  />
                )}
              </div>
              <span className="text-white">{secondName}</span>
            </div>
            <span className="text-white font-bold">{secondScore || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionshipMatchCard;
