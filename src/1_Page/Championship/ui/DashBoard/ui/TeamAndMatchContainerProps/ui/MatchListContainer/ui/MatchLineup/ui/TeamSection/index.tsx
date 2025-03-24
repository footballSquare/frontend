import { useNavigate } from "react-router-dom";
import { matchPosition } from "../../../../../../../../../../../../4_Shared/constant/matchPosition";
import { basePositionCoordinates } from "../../constant/lineup";

const TeamSection = (props: TeamSectionProps) => {
  const { players, isFirstTeam, isFormationView } = props;
  const navigate = useNavigate();

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
              onClick={() => navigate(`/profile/${player.player_list_idx}`)}
              className="relative group p-3 border-b bg-white rounded-md shadow-md hover:bg-gray-50 transition">
              <div className="text-sm">{player.player_list_nickname}</div>
              <div className="absolute left-full top-0 ml-2 p-2 bg-gray-800 text-white text-xs rounded-md shadow-md border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                <div>
                  Position: {matchPosition[player.match_player_stats_possition]}
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
          ))}
        </div>
      )}

      {/* 팀 포메이션 */}

      {/* 팀 포메이션 */}
      <div
        className={`w-full sm:w-[300px] h-[500px] bg-green-500 rounded-lg shadow-xl p-2 relative ${
          isFormationView ? "block" : "hidden"
        } sm:block`}>
        {players?.map((player) => {
          // players의 인덱스를 기준으로 matchPosition 배열에서 포지션을 결정
          const pos = matchPosition[player.match_player_stats_possition];
          const basePos = basePositionCoordinates[pos];
          return (
            <div
              key={`formation-${player.match_player_stats_possession}`}
              className="absolute flex flex-col items-center group"
              style={{
                top: basePos.top,
                left: basePos.left,
                transform: "translateX(-50%)",
              }}>
              <p>{player.player_list_nickname}</p>
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow group-hover:scale-110 transition-transform"></div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-xs rounded-md shadow-md border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ">
                <div>
                  Position: {matchPosition[player.match_player_stats_possition]}
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
              onClick={() => navigate(`/profile/${player.player_list_idx}`)}>
              <div className="text-sm">{player.player_list_nickname}</div>
              <div className="absolute right-full top-0 mr-2 p-2 bg-gray-800 text-white text-xs rounded-md shadow-md border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ">
                <div>
                  Position: {matchPosition[player.match_player_stats_possition]}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSection;
