import { useNavigate } from "react-router-dom";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { getPositionColor } from "../../../../4_Shared/lib/getPositionColor";
import useToggleState from "../../../../4_Shared/model/useToggleState";
import { calculatePlayerPosition } from "./lib/calculatePlayerPosition";

const PlayerGroundPoint = (props: PlayerGroundPointProps) => {
  const { player, index, formation, isMOM, teamColor, teamType } = props;
  const navigate = useNavigate();
  const positionColor = getPositionColor(player.match_position_idx);
  const [isTooltipOpen, toggleTooltip] = useToggleState(false);

  // 포지션 계산 로직
  const { finalTop, finalLeft } = calculatePlayerPosition({
    formation,
    playerPositionIdx: player.match_position_idx,
    index,
    teamType,
  });

  return (
    <div
      key={`${teamType}-${player.player_list_idx}`}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        top: `${finalTop}%`,
        left: `${finalLeft}%`,
      }}
      onClick={() => toggleTooltip()}>
      <div
        className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
          isMOM
            ? "bg-yellow-400 border-yellow-600 shadow-lg shadow-yellow-400/50"
            : "border-opacity-80"
        }`}
        style={{
          backgroundColor: isMOM ? undefined : teamColor,
          borderColor: isMOM ? undefined : teamColor,
        }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xs font-bold">{index + 1}</span>
        </div>

        {/* MOM 아이콘 */}
        {isMOM && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border border-orange-500">
            <span className="text-orange-500 text-sm">👑</span>
          </div>
        )}

        {/* 골 이모지 */}
        {(player.match_player_stats_goal || 0) > 0 && (
          <div className="absolute -top-0.5 -left-0.5 w-3 h-3 bg-black rounded-full flex items-center justify-center border border-white">
            <span className="text-white text-xs">⚽</span>
            {(player.match_player_stats_goal || 0) > 1 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {player.match_player_stats_goal}
              </span>
            )}
          </div>
        )}

        {/* 어시스트 이모지 */}
        {(player.match_player_stats_assist || 0) > 0 && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-black rounded-full flex items-center justify-center border border-white">
            <span className="text-white text-xs">🎯</span>
            {(player.match_player_stats_assist || 0) > 1 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {player.match_player_stats_assist}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 선수 정보 */}
      <div className="text-white text-xs font-medium text-center mt-1">
        <div className="px-1 py-0.5 bg-black/50 rounded mb-1 max-w-[60px] truncate">
          {player.player_list_nickname || "선수명 없음"}
        </div>
        <div
          className="px-1 py-0.5 rounded text-xs max-w-[80px] truncate"
          style={{
            backgroundColor: positionColor,
            color: "white",
          }}>
          {matchPosition[player.match_position_idx] || "N/A"}
        </div>
      </div>

      {/* 툴팁 */}
      {isTooltipOpen && (
        <div
          className={`absolute ${
            teamType === "home" ? "top-full mt-2" : "bottom-full mb-2"
          } left-1/2 transform -translate-x-1/2`}>
          <div
            className={`bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg border ${
              teamType === "home" ? "border-blue-500" : "border-red-500"
            } min-w-[150px]`}>
            {/* 툴팁 화살표 */}
            <div
              className={`absolute ${
                teamType === "home"
                  ? "-top-1 border-l border-t border-blue-500"
                  : "-bottom-1 border-r border-b border-red-500"
              } left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45`}></div>

            <div
              className={`text-sm font-medium mb-2 ${
                teamType === "home" ? "text-blue-300" : "text-red-300"
              }`}>
              <span
                className="cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${player.player_list_idx}`);
                }}>
                {player.player_list_nickname}
              </span>
              <span className="ml-1">
                ({teamType === "home" ? "홈팀" : "어웨이팀"})
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-300">포지션:</span>
                <span>{matchPosition[player.match_position_idx] || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">골:</span>
                <span>{player.match_player_stats_goal || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">어시스트:</span>
                <span>{player.match_player_stats_assist || 0}</span>
              </div>
              {player.match_player_stats_successrate_pass && (
                <div className="flex justify-between">
                  <span className="text-gray-300">패스 성공률:</span>
                  <span>{player.match_player_stats_successrate_pass}%</span>
                </div>
              )}
              {player.match_player_stats_possession && (
                <div className="flex justify-between">
                  <span className="text-gray-300">점유율:</span>
                  <span>{player.match_player_stats_possession}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerGroundPoint;
