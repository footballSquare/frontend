import usePlayerSearch from "./model/usePlayerSearch";
import down_blue from "../../../../../../../../../../4_Shared/assets/svg/down_blue.svg";

const AwardPlayerSelector = (props: AwardPlayerSelectorProps) => {
  const {
    players,
    index,
    award,
    selectedAwardPlayers,
    handlePlayerSelectForAward,
  } = props;
  // 선수 검색 훅
  const { playerSearchTerm, filteredPlayers, handleSetPlayerSearchTerm } =
    usePlayerSearch(players);

  return (
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
            <span className="text-xs font-normal text-blue-500">수상 선수</span>
          </h3>
        </div>
        <div className="flex items-center">
          {selectedAwardPlayers[index] && (
            <span className="mr-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              선택됨
            </span>
          )}
          <img className="w-3 h-3" src={down_blue} />
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
            onChange={(e) => handleSetPlayerSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <img className="w-3 h-3" src={down_blue} />
          </div>
          {playerSearchTerm && (
            <button
              onClick={() => handleSetPlayerSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-blue-400 hover:text-blue-600">
              <img className="w-3 h-3" src={down_blue} />
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
                  onClick={() => handlePlayerSelectForAward(index, player)}
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
                      <img className="w-3 h-3" src={down_blue} />
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
                <img className="w-3 h-3" src={down_blue} />
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
  );
};

export default AwardPlayerSelector;
