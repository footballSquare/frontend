import React from "react";
import usePutChampionshipEnd from "../../../../../../3_Entity/Championship/usePutChampionshipEnd";
import useParamInteger from "../../../../../../4_Shared/model/useParamInteger";
import useGetChampionshipTeams from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";
import useGetPlayerStats from "../../../../../../3_Entity/Championship/useGetPlayerStats";
import { matchPosition } from "../../../../../../4_Shared/constant/matchPosition";
import { convertHexToRGBA } from "./lib/colorConverter";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import useManageSearchPlayer from "./model/useManageSearchPlayer";

const EndModalWithBtn = () => {
  const [isModalOpen, handleToggleModal] = useToggleState();

  const championshipListIdx = useParamInteger("championshipListIdx");
  const [championshipTeam] = useGetChampionshipTeams(championshipListIdx);
  const [playerStats] = useGetPlayerStats(championshipListIdx);
  const [putChampionshipEnd] = usePutChampionshipEnd(championshipListIdx);

  const [selectTeam, setSelectTeam] =
    React.useState<ChampionshipTeamInfo | null>(null);
  const [selectedPlayerAwards, setSelectedPlayerAwards] =
    React.useState<PlayerStats | null>(null);

  const [filteredPlayers, searchTerm, handleSearchTermChange] =
    useManageSearchPlayer(playerStats);

  const handlePutEnd = () => {
    const teamIdx = selectTeam?.team_list_idx;
    const playerIdx = selectedPlayerAwards?.player_list_idx;
    if (!teamIdx || !playerIdx) return;

    putChampionshipEnd({
      team_list_idx: teamIdx,
      player_list_idx: playerIdx,
    });
    handleToggleModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleToggleModal}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
        대회 종료
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl transform transition-all animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                대회 종료 정보 입력
              </h2>
              <button
                onClick={handleToggleModal}
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition duration-200 focus:outline-none"></button>
            </div>

            {/* 우승팀 선정 영역 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-blue-700 border-b pb-2">
                우승팀 선정
              </h3>
              <div className="max-h-[200px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
                {championshipTeam.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">
                    등록된 팀이 없습니다.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 max-h-[200px]">
                    {championshipTeam.map((team) => {
                      const { teamColor, teamBgColor, teamBorderColor } =
                        convertHexToRGBA(team.team_list_color);
                      return (
                        <div
                          key={"team_card_" + team.team_list_idx}
                          onClick={() => setSelectTeam(team)}
                          style={{
                            backgroundColor:
                              selectTeam?.team_list_idx === team.team_list_idx
                                ? teamBgColor
                                : "white",
                            borderColor:
                              selectTeam?.team_list_idx === team.team_list_idx
                                ? teamBorderColor
                                : "#E5E7EB",
                            borderLeft: `4px solid ${teamColor}`,
                          }}
                          className={`cursor-pointer p-3 border rounded-lg transition-all duration-200 hover:shadow-md 
                              ${
                                selectTeam?.team_list_idx === team.team_list_idx
                                  ? "border-2"
                                  : "hover:border-gray-300"
                              }`}>
                          <div className="flex items-center space-x-2">
                            {team.team_list_emblem && (
                              <div
                                className="flex-shrink-0"
                                style={{ minWidth: "40px" }}>
                                <img
                                  src={team.team_list_emblem}
                                  alt={team.team_list_name}
                                  className="w-10 h-10 object-contain rounded-full bg-white p-1 border shadow-sm"
                                  style={{ borderColor: teamColor }}
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div
                                className="font-bold text-gray-800 truncate"
                                title={team.team_list_name}>
                                {team.team_list_name}
                              </div>
                              <div
                                className={`text-xs truncate font-semibold`}
                                title={team.team_list_short_name}>
                                {team.team_list_short_name}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {selectTeam && (
                <div className="mt-2 p-2 border rounded-md bg-blue-50 shadow-sm max-h-[150px]">
                  <h4 className="text-sm font-bold mb-1 text-blue-700">
                    선택된 우승팀
                  </h4>
                  <div className="flex items-center space-x-4">
                    {selectTeam.team_list_emblem && (
                      <img
                        src={selectTeam.team_list_emblem}
                        alt={selectTeam.team_list_name}
                        className="w-10 h-10 object-contain rounded-full bg-white p-1 border shadow-sm"
                      />
                    )}
                    <div>
                      <div className="font-bold text-md">
                        {selectTeam.team_list_name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {selectTeam.team_list_short_name}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 개인 선수 선정 영역 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-green-700 border-b pb-2">
                MVP 선수 선정
              </h3>
              <div className="mb-4 relative">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <div className="pl-3 text-gray-400">🔍</div>
                  <input
                    type="text"
                    placeholder="선수 이름으로 검색..."
                    value={searchTerm}
                    onChange={(e) => handleSearchTermChange(e.target.value)}
                    className="w-full px-3 py-3 focus:outline-none"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => handleSearchTermChange("")}
                      className="px-3 text-gray-400 hover:text-gray-600">
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-[100px] overflow-y-auto rounded-lg p-1 bg-gray-50">
                {filteredPlayers.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">
                    {searchTerm
                      ? "검색 결과가 없습니다."
                      : "등록된 선수가 없습니다."}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredPlayers.map((player) => (
                      <div
                        key={"player_card_" + player.player_list_idx}
                        onClick={() => {
                          setSelectedPlayerAwards(player);
                        }}
                        className={`cursor-pointer p-3 border rounded-lg transition-all duration-200 hover:shadow-md ${
                          selectedPlayerAwards?.player_list_idx ===
                          player.player_list_idx
                            ? "bg-green-100 border-green-400"
                            : "bg-white hover:bg-green-50"
                        }`}>
                        <div className="font-medium">
                          {matchPosition[player.match_player_stats_possition]}
                          {player.player_list_nickname}
                        </div>
                        <div className="text-sm text-gray-600 flex justify-between">
                          <span></span>
                          <span>골: {player.match_player_stats_goal || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedPlayerAwards && (
                <div className="mt-2 p-2 border rounded-md bg-green-50 shadow-sm">
                  <h4 className="text-sm font-bold mb-1 text-green-700">
                    선택된 MVP 선수
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-md">
                        {
                          matchPosition[
                            selectedPlayerAwards.match_player_stats_possition
                          ]
                        }
                        {selectedPlayerAwards.player_list_nickname}
                      </div>
                      <div className="text-xs text-gray-600">
                        {
                          matchPosition[
                            selectedPlayerAwards.match_player_stats_possition
                          ]
                        }
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold">
                        골: {selectedPlayerAwards.match_player_stats_goal || 0}
                      </div>
                      <div className="text-xs text-gray-600">
                        어시스트:{" "}
                        {selectedPlayerAwards.match_player_stats_assist || 0}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-between mt-8 pt-4 border-t">
              <button
                onClick={handleToggleModal}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
                취소
              </button>
              <button
                disabled={!selectTeam || !selectedPlayerAwards}
                onClick={handlePutEnd}
                className={`px-5 py-2 rounded-lg transition duration-200 ${
                  !selectTeam || !selectedPlayerAwards
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}>
                대회 종료 확정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndModalWithBtn;
