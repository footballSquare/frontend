// 팀 섹션 렌더링 함수 (포메이션 + 라인업)
const TeamSection = (props) => {
  const { players, assignedPositions, isFirstTeam, isFormationView } = props;

  return (
    <div className={"flex flex-col md:flex-row items-center w-full md:w-auto"}>
      {/* 팀 라인업 */}
      {isFirstTeam && (
        <div
          className={`w-full md:w-1/4 ${
            isFormationView ? "hidden sm:block" : "block"
          }`}>
          {players?.map((player, idx) => (
            <div key={`lineup-${idx}`} className="relative group p-2 border-b">
              <div className="text-sm">{player.player_list_nickname}</div>
              <div className="absolute left-full top-0 ml-2 p-2 bg-white border text-xs hidden group-hover:block whitespace-nowrap z-10">
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
        className={`relative w-full sm:w-[350px] sm:h-[600px] h-auto bg-green-600 rounded-md ${
          !isFormationView ? "hidden sm:block" : "relative"
        }`}>
        {assignedPositions.map((player, idx) => (
          <div
            key={`formation-${idx}`}
            className="absolute bg-white text-black text-sm rounded-full w-8 h-8 flex items-center justify-center shadow"
            style={{
              top: player.top,
              left: player.left,
              transform: "translateX(-50%)",
            }}>
            {player.nickname}
          </div>
        ))}
      </div>

      {/* 상대 팀 라인업 */}
      {!isFirstTeam && (
        <div
          className={`w-full md:w-1/4 ${
            isFormationView ? "hidden sm:block" : "block"
          }`}>
          {players?.map((player, idx) => (
            <div key={`lineup-${idx}`} className="relative group p-2 border-b">
              <div className="text-sm">{player.player_list_nickname}</div>
              <div className="absolute right-full top-0 mr-2 p-2 bg-white border shadow text-xs hidden group-hover:block whitespace-nowrap z-10">
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
