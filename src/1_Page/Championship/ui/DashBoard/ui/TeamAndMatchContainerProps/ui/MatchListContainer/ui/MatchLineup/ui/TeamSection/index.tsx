import React from "react";
import { useNavigate } from "react-router-dom";
import { basePositionCoordinates } from "../../constant/lineup";
import { matchPosition } from "../../../../../../../../../../../../4_Shared/constant/matchPosition";

const TeamSection = (props: TeamSectionProps) => {
  const { players, isFirstTeam, isFormationView, momPlayerIdx } = props;

  const navigate = useNavigate();
  const [activeTooltipId, setActiveTooltipId] = React.useState<number | null>(
    null
  );

  return (
    <div className={"flex flex-col sm:flex-row items-center w-full  md:w-auto"}>
      {/* 팀 라인업 */}
      {isFirstTeam && (
        <div
          className={`w-full flex-col md:w-1/4 ${
            isFormationView ? "hidden" : "flex"
          } sm:flex`}>
          {players?.map((player, idx) => (
            <div
              key={`lineup-${idx}`}
              onClick={() => {
                setActiveTooltipId(
                  activeTooltipId === player.player_list_idx
                    ? null
                    : player.player_list_idx
                );
              }}
              className="relative group p-3 border-b bg-white rounded-md shadow-md hover:bg-gray-50 transition">
              <div
                className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                  player.player_list_idx === momPlayerIdx
                    ? "text-yellow-500 font-bold"
                    : ""
                }`}>
                {player.player_list_idx === momPlayerIdx ? "MOM " : ""}
                {matchPosition[player.match_player_stats_possition]}
                {" : "}
                {player.player_list_nickname}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 팀 포메이션 */}
      <div
        className={`w-full sm:w-[300px] h-[500px] bg-green-500 rounded-lg shadow-xl p-2 relative ${
          isFormationView ? "block" : "hidden"
        } sm:block`}>
        <div className="absolute top-0 left-1/2 w-[100px] h-[50px] overflow-hidden transform -translate-x-1/2">
          <div className="w-[100px] h-[100px] rounded-full border border-white transform translate-y-[-50%]"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 w-[100px] h-[40px] border-t border-l border-r border-white transform -translate-x-1/2"></div>
        {players?.map((player) => {
          // players의 인덱스를 기준으로 matchPosition 배열에서 포지션을 결정
          const pos = matchPosition[player.match_player_stats_possition];

          const basePos = basePositionCoordinates[pos];
          return (
            <div
              onClick={() => {
                setActiveTooltipId(
                  activeTooltipId === player.player_list_idx
                    ? null
                    : player.player_list_idx
                );
              }}
              key={`formation-${player.player_list_idx}-${player.match_player_stats_possession}`}
              className="absolute flex flex-col items-center"
              style={{
                top: basePos.top,
                left: basePos.left,
                transform: "translateX(-50%)",
              }}>
              <div className="group flex flex-col items-center">
                <p
                  className={`truncate whitespace-nowrap overflow-hidden text-[10px] leading-tight ${
                    player.player_list_idx === momPlayerIdx
                      ? "text-yellow-400 font-bold"
                      : ""
                  }`}>
                  {player.player_list_idx === momPlayerIdx ? "MOM " : ""}
                  {player.player_list_nickname}
                </p>
                <div
                  className={`relative rounded-full w-8 h-8 flex items-center justify-center shadow group-hover:scale-110 transition-transform ${
                    player.player_list_idx === momPlayerIdx
                      ? "bg-yellow-300"
                      : "bg-white"
                  }`}>
                  {/* 골 아이콘 표시 */}
                  {player.match_player_stats_goal > 0 && (
                    <div className="absolute -bottom-1 -left-1 text-[10px] bg-black text-white px-1 rounded-full flex items-center gap-0.5">
                      ⚽
                      {player.match_player_stats_goal > 1 && (
                        <span className="ml-0.5">
                          +{player.match_player_stats_goal}
                        </span>
                      )}
                    </div>
                  )}
                  {/* 어시스트 아이콘 표시 */}
                  {player.match_player_stats_assist > 0 && (
                    <div className="absolute -bottom-1 -right-1 text-[10px] bg-black text-white px-1 rounded-full flex items-center gap-0.5">
                      🎯
                      {player.match_player_stats_assist > 1 && (
                        <span className="ml-0.5">
                          +{player.match_player_stats_assist}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg border border-gray-600 whitespace-nowrap transition-opacity duration-200  ${
                    activeTooltipId === player.player_list_idx
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}>
                  <p
                    onClick={() =>
                      navigate(`/profile/${player.player_list_idx}`)
                    }>
                    프로필 상세보기
                  </p>
                  <div>Name: {player.player_list_nickname}</div>
                  <div>
                    Position:{" "}
                    {matchPosition[player.match_player_stats_possition]}
                  </div>
                  <div>Goal: {player.match_player_stats_goal}</div>
                  <div>Assist: {player.match_player_stats_assist}</div>
                  <div>Pass: {player.match_player_stats_successrate_pass}</div>
                  <div>
                    Dribble: {player.match_player_stats_successrate_dribble}
                  </div>
                  <div>
                    Tackle: {player.match_player_stats_successrate_tackle}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 상대 팀 라인업 */}
      {!isFirstTeam && (
        <div
          className={`w-full flex-col md:w-1/4 ${
            isFormationView ? "hidden" : "flex"
          } sm:flex`}>
          {players?.map((player, idx) => (
            <div
              key={`lineup-${idx}`}
              className="relative group p-3 border-b bg-white rounded-md shadow-md hover:bg-gray-50 transition"
              onClick={() => {
                setActiveTooltipId(
                  activeTooltipId === player.player_list_idx
                    ? null
                    : player.player_list_idx
                );
              }}>
              <div
                className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                  player.player_list_idx === momPlayerIdx
                    ? "text-yellow-500 font-bold"
                    : ""
                }`}>
                {player.player_list_idx === momPlayerIdx ? "MOM " : ""}
                {matchPosition[player.match_player_stats_possition]}
                {" : "}
                {player.player_list_nickname}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSection;
