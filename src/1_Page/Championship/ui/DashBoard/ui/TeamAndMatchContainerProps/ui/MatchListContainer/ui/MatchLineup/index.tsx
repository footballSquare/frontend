import { useState } from "react";
import useGetChampionshipDetail from "../../../../../../../../../../3_Entity/Championship/useGetChampionshipDetail";
import { formation } from "../../../../../../../../../../4_Shared/constant/formation";
import { formationCoordinateMap } from "./constant/lineup";

// 팀 섹션 렌더링 함수 (포메이션 + 라인업)
const renderTeamSection = (
  players,
  assignedPositions,
  isFirstTeam,
  isFormationView
) => (
  <div className={"flex flex-col md:flex-row items-center w-full md:w-auto"}>
    {/* 팀 라인업 */}
    {isFirstTeam && (
      <div
        className={`w-full md:w-1/4 ${
          isFormationView ? "hidden sm:block" : "block"
        }`}>
        {players.map((player, idx) => (
          <div key={`lineup-${idx}`} className="relative group p-2 border-b">
            <div className="text-sm">{player.player_list_nickname}</div>
            <div className="absolute left-full top-0 ml-2 p-2 bg-white border text-xs hidden group-hover:block whitespace-nowrap z-10">
              <div>Goal: {player.match_player_stats_goal}</div>
              <div>Assist: {player.match_player_stats_assist}</div>
              <div>Pass: {player.match_player_stats_successrate_pass}</div>
              <div>
                Dribble: {player.match_player_stats_successrate_dribble}
              </div>
              <div>Tackle: {player.match_player_stats_successrate_tackle}</div>
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
        {players.map((player, idx) => (
          <div key={`lineup-${idx}`} className="relative group p-2 border-b">
            <div className="text-sm">{player.player_list_nickname}</div>
            <div className="absolute right-full top-0 mr-2 p-2 bg-white border shadow text-xs hidden group-hover:block whitespace-nowrap z-10">
              <div>Goal: {player.match_player_stats_goal}</div>
              <div>Assist: {player.match_player_stats_assist}</div>
              <div>Pass: {player.match_player_stats_successrate_pass}</div>
              <div>
                Dribble: {player.match_player_stats_successrate_dribble}
              </div>
              <div>Tackle: {player.match_player_stats_successrate_tackle}</div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const MatchLineup = ({ matchIdx }) => {
  const [viewMode, setViewMode] = useState("formation");
  const [championshipDetail] = useGetChampionshipDetail(matchIdx);

  const firstTeamPlayers = championshipDetail?.first_team?.player_stats || [];
  const secondTeamPlayers = championshipDetail?.second_team?.player_stats || [];

  const firstTeamFormation = formation[
    championshipDetail?.first_team?.team_formation_idx
  ] as keyof typeof formationCoordinateMap;
  const secondTeamFormation = formation[
    championshipDetail?.second_team?.team_formation_idx
  ] as keyof typeof formationCoordinateMap;

  const firstCoord = formationCoordinateMap[firstTeamFormation] || [];
  const secondCoord = formationCoordinateMap[secondTeamFormation] || [];

  const assignedFirst = firstCoord.map((coord, idx) => ({
    ...coord,
    nickname: firstTeamPlayers[idx]?.player_list_nickname || "빈자리",
  }));

  const assignedSecond = secondCoord.map((coord, idx) => ({
    ...coord,
    nickname: secondTeamPlayers[idx]?.player_list_nickname || "빈자리",
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        매치 #{matchIdx} 라인업
      </h2>

      {/* 모바일에서는 선택할 수 있는 토글 버튼 */}
      <div className="md:hidden flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 border rounded ${
            viewMode === "formation" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("formation")}>
          포메이션 보기
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            viewMode === "lineup" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("lineup")}>
          라인업 보기
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
        {/* 첫 번째 팀 (왼쪽) */}
        {renderTeamSection(
          firstTeamPlayers,
          assignedFirst,
          true,
          viewMode === "formation"
        )}

        {/* 두 번째 팀 (오른쪽) */}
        {renderTeamSection(
          secondTeamPlayers,
          assignedSecond,
          false,
          viewMode === "formation"
        )}
      </div>
    </div>
  );
};

export default MatchLineup;
