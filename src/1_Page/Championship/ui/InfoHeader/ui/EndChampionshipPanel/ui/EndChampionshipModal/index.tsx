import useParamInteger from "../../../../../../../../4_Shared/model/useParamInteger";
import usePutChampionshipEnd from "../../../../../../../../3_Entity/Championship/usePutChampionshipEnd";

import React from "react";
import useGetChampionshipEndData from "../../../../../../../../3_Entity/Championship/useGetChampionshipEndData";

const EndChampionshipModal = (props: EndChampionshipModalProps) => {
  const { onClose } = props;
  const championshipListIdx = useParamInteger("championshipIdx");

  const [championshipEndData] = useGetChampionshipEndData(championshipListIdx);
  const [putChampionshipEnd] = usePutChampionshipEnd(championshipListIdx);

  // State hooks
  const [selectTeam, setSelectTeam] = React.useState<EndTeamInfo | null>(null);

  const initialAwards = championshipEndData.awards ?? [];
  const [selectedAwardPlayers, setSelectedAwardPlayers] = React.useState<
    (EndPlayerStatas | null)[]
  >(() => initialAwards.map(() => null));

  // Player name search term
  const [playerSearchTerm, setPlayerSearchTerm] = React.useState<string>("");

  const filteredPlayers = React.useMemo(() => {
    if (!playerSearchTerm) return championshipEndData.players;
    return championshipEndData.players.filter((player) =>
      player.player_list_nickname
        .toLowerCase()
        .includes(playerSearchTerm.toLowerCase())
    );
  }, [championshipEndData, playerSearchTerm]);

  const handlePlayerSelectForAward = (
    awardIndex: number,
    player: EndPlayerStatas
  ) => {
    const newSelectedAwardPlayers = [...selectedAwardPlayers];
    newSelectedAwardPlayers[awardIndex] = player;
    setSelectedAwardPlayers(newSelectedAwardPlayers);
  };

  const handlePutEnd = () => {
    const teamIdx = selectTeam?.team_list_idx;
    const allAwardsSelected = selectedAwardPlayers.every(
      (player) => player !== null
    );
    if (!teamIdx || !allAwardsSelected) return;

    const awardsPayload = championshipEndData.awards.map((award, index) => ({
      championship_award_idx: award.championship_award_idx,
      championship_winner_idxs: [
        selectedAwardPlayers[index]?.player_list_idx,
      ].filter((id): id is number => id !== undefined),
    }));

    putChampionshipEnd({
      winner_team_idx: teamIdx,
      awards: awardsPayload,
    });
    onClose();
  };

  // 모든 수상이 선택되었는지 확인
  const isFormComplete =
    selectTeam && selectedAwardPlayers.every((player) => player !== null);

  return (
    <div className="fixed inset-0 z-10 bg-black/75 backdrop-blur-sm flex items-center justify-center overflow-y-auto py-8">
      <div className="w-full max-w-xl p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-2xl transform transition-all animate-fade-in max-h-[90vh] overflow-y-auto border border-blue-100">
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 flex items-center">
            <span className="text-blue-600 mr-2">🏆</span>
            대회 종료 정보 입력
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-500 rounded-full hover:bg-blue-100 transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 우승팀 선정 영역 */}
        <div className="mb-6">
          <h3 className="text-sm uppercase font-bold mb-3 text-blue-700 flex items-center">
            <span className="mr-1">🏅</span>우승팀 선정
          </h3>

          <div className="max-h-[120px] overflow-y-auto rounded-lg bg-white/70 border border-blue-200 p-2">
            {championshipEndData.teams &&
            championshipEndData.teams.length === 0 ? (
              <div className="text-blue-500 text-center py-3 text-sm">
                등록된 팀이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {championshipEndData.teams &&
                  championshipEndData.teams.map((team) => {
                    return (
                      <div
                        key={"team_card_" + team.team_list_idx}
                        onClick={() => setSelectTeam(team)}
                        style={{
                          background:
                            selectTeam?.team_list_idx === team.team_list_idx
                              ? `linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(191, 219, 254, 0.8))`
                              : "white",
                        }}
                        className={`cursor-pointer p-2 border rounded-md transition-all duration-150 text-sm relative overflow-hidden group
                      ${
                        selectTeam?.team_list_idx === team.team_list_idx
                          ? "shadow-md border-blue-300"
                          : "hover:border-blue-300 hover:shadow-blue-100"
                      }`}>
                        {/* 배경 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100"></div>

                        <div className="flex items-center space-x-2 relative z-10">
                          <div className="min-w-0 flex-1">
                            <div
                              className={`font-medium truncate transition-all duration-200 ${
                                selectTeam?.team_list_idx === team.team_list_idx
                                  ? "text-blue-800"
                                  : "text-gray-800 group-hover:text-blue-700"
                              }`}
                              title={team.team_list_name}>
                              {team.team_list_name}
                            </div>
                            <div className="text-xs text-blue-500 opacity-80">
                              {team.team_list_name}
                            </div>
                          </div>

                          {/* 선택 표시 아이콘 */}
                          {selectTeam?.team_list_idx === team.team_list_idx && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {selectTeam && (
            <div className="mt-2 p-2 border rounded-md bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm flex items-center border-blue-200">
              <div className="flex-shrink-0 mr-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs shadow-sm">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-blue-800">
                  {selectTeam.team_list_name}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 수상 선수 선정 영역 - 아코디언 스타일로 변경 */}
        <div className="space-y-3">
          {championshipEndData.awards &&
            championshipEndData.awards.map((award, index) => (
              <div
                key={"award_section_" + index}
                className="border border-blue-200 rounded-lg overflow-hidden shadow-sm">
                {/* 아코디언 헤더 */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-100 to-blue-50 cursor-pointer hover:from-blue-200 hover:to-blue-100">
                  <div className="flex items-center">
                    <span className="mr-2 text-amber-500">🏅</span>
                    <h3 className="text-sm font-bold text-blue-700">
                      <img src={award.championship_award_throphy_image} />
                      {award.championship_award_name}{" "}
                      <span className="text-xs font-normal text-blue-500">
                        수상 선수
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center">
                    {selectedAwardPlayers[index] && (
                      <span className="mr-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        선택됨
                      </span>
                    )}
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* 아코디언 콘텐츠 */}
                <div className="p-3 border-t border-blue-100 bg-white/70">
                  {/* 검색 필드 */}
                  <div className="mb-2 relative">
                    <input
                      type="text"
                      placeholder="선수 이름으로 검색..."
                      value={playerSearchTerm}
                      onChange={(e) => setPlayerSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <svg
                        className="w-3.5 h-3.5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    {playerSearchTerm && (
                      <button
                        onClick={() => setPlayerSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-blue-400 hover:text-blue-600">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* 선수 목록 */}
                  <div className="max-h-[120px] overflow-y-auto rounded-md bg-white/80 p-1 border border-blue-100">
                    {filteredPlayers.length === 0 ? (
                      <div className="text-blue-500 text-center py-3 text-xs">
                        {playerSearchTerm
                          ? "검색 결과가 없습니다."
                          : "등록된 선수가 없습니다."}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-1.5">
                        {filteredPlayers.map((player) => (
                          <div
                            key={`player_card_${award.championship_award_name}_${player.player_list_idx}`}
                            onClick={() =>
                              handlePlayerSelectForAward(index, player)
                            }
                            className={`cursor-pointer p-2 border rounded-md transition-all duration-150 hover:shadow-sm text-xs relative group overflow-hidden
                          ${
                            selectedAwardPlayers[index]?.player_list_idx ===
                            player.player_list_idx
                              ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-sm"
                              : "bg-white hover:border-blue-200"
                          }`}>
                            {/* 배경 효과 - 선택되지 않았을 때만 호버 효과 */}
                            {selectedAwardPlayers[index]?.player_list_idx !==
                              player.player_list_idx && (
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                            )}

                            <div className="relative z-10">
                              <div className="font-medium truncate text-blue-800">
                                {player.player_list_nickname}
                              </div>
                            </div>

                            {/* 선택 표시 아이콘 */}
                            {selectedAwardPlayers[index]?.player_list_idx ===
                              player.player_list_idx && (
                              <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 선택된 선수 표시 */}
                  {selectedAwardPlayers[index] && (
                    <div className="mt-2 p-2 border rounded-md bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-xs flex items-center shadow-sm">
                      <div className="flex-shrink-0 mr-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-sm">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-blue-800">
                          {selectedAwardPlayers[index]?.player_list_nickname}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* 진행 상태 표시 */}
        <div className="mt-5 mb-4">
          <div className="w-full bg-blue-100 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full transition-all duration-300 shadow-sm"
              style={{
                width: `${
                  (((selectTeam ? 1 : 0) +
                    selectedAwardPlayers.filter((p) => p !== null).length) /
                    (1 + selectedAwardPlayers.length)) *
                  100
                }%`,
              }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-blue-600">
            <span>우승팀 선택</span>
            <span>수상 선수 선택</span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-between mt-5 pt-4 border-t border-blue-200">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition text-sm font-medium border border-blue-200">
            취소
          </button>
          <button
            disabled={!isFormComplete}
            onClick={handlePutEnd}
            className={`px-4 py-1.5 rounded-md transition text-sm font-medium flex items-center shadow-sm ${
              !isFormComplete
                ? "bg-blue-200 text-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
            }`}>
            {!isFormComplete ? (
              "모든 항목 선택 필요"
            ) : (
              <div className="flex items-center">
                <span>대회 종료 확정</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndChampionshipModal;
