const TeamSection = (props) => {
  const { players, assignedPositions, isFirstTeam, isFormationView } = props;

  return (
    <div className={"flex flex-col sm:flex-row items-center w-full  md:w-auto"}>
      {/* 팀 라인업 */}
      {isFirstTeam && (
        <div
          className={`w-full flex-col md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg ${
            isFormationView ? "hidden" : "flex"
          } sm:flex`}>
          {players?.map((player, idx) => (
            <div
              key={`lineup-${idx}`}
              className="relative group p-3 border-b bg-white rounded-md shadow-md hover:bg-gray-50 transition">
              <div className="text-sm">{player.player_list_nickname}</div>
              <div className="absolute left-full top-0 ml-2 p-4 bg-gray-50 border border-gray-300 rounded-md shadow-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
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

      <div
        className={`w-full sm:w-[350px] h-[600px] bg-green-500 rounded-lg shadow-xl p-4 relative ${
          isFormationView ? "block" : "hidden"
        } sm:block`}>
        {assignedPositions.map((player, idx) => (
          <div
            key={`formation-${idx}`}
            className="absolute flex flex-col items-center"
            style={{
              top: player.top,
              left: player.left,
              transform: "translateX(-50%)",
            }}>
            <p>{player.nickname}</p>
            <div className=" bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"></div>
          </div>
        ))}
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
              className="relative group p-3 border-b bg-white rounded-md shadow-md hover:bg-gray-50 transition">
              <div className="text-sm">{player.player_list_nickname}</div>
              <div className="absolute right-full top-0 mr-2 p-4 bg-gray-50 border border-gray-300 rounded-md shadow-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
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
