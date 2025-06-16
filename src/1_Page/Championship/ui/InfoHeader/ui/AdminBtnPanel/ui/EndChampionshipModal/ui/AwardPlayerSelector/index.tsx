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
      className="border border-gray-700/50 rounded-lg overflow-hidden shadow-sm bg-gray-800/30">
      {/* 아코디언 헤더 */}
      <div className="flex items-center justify-between p-3 bg-gray-800/50 cursor-pointer hover:bg-gray-700/50 transition-colors">
        <div className="flex items-center">
          <span className="mr-2 text-amber-500">🏅</span>
          <h3 className="text-sm font-bold text-grass">
            <img src={award.championship_award_throphy_image} />
            {award.championship_award_name}{" "}
            <span className="text-xs font-normal text-gray-400">수상 선수</span>
          </h3>
        </div>
        <div className="flex items-center">
          {selectedAwardPlayers[index] && (
            <span className="mr-2 text-xs font-medium text-grass bg-grass/10 px-2 py-0.5 rounded-full border border-grass/30">
              선택됨
            </span>
          )}
          <img className="w-3 h-3" src={down_blue} />
        </div>
      </div>

      {/* 아코디언 콘텐츠 */}
      <div className="p-3 border-t border-gray-700/50 bg-gray-800/20">
        {/* 검색 필드 */}
        <div className="mb-2 relative">
          <input
            type="text"
            placeholder="선수 이름으로 검색..."
            value={playerSearchTerm}
            onChange={(e) => handleSetPlayerSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 rounded-md focus:ring-1 focus:ring-grass/50 focus:border-grass/50 focus:outline-none text-gray-100 placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <img className="w-3 h-3" src={down_blue} />
          </div>
          {playerSearchTerm && (
            <button
              onClick={() => handleSetPlayerSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-grass">
              <img className="w-3 h-3" src={down_blue} />
            </button>
          )}
        </div>

        {/* 선수 목록 */}
        <div className="max-h-[120px] overflow-y-auto rounded-md bg-gray-800/50 p-1 border border-gray-700/50">
          {filteredPlayers.length === 0 ? (
            <div className="text-gray-400 text-center py-3 text-xs">
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
                      ? "bg-grass/10 border-grass/30 shadow-sm"
                      : "bg-gray-700/50 border-gray-600 hover:border-grass/30 hover:bg-gray-600/50"
                  }`}>
                  {/* 배경 효과 - 선택되지 않았을 때만 호버 효과 */}
                  {selectedAwardPlayers[index]?.player_list_idx !==
                    player.player_list_idx && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-grass/10 to-transparent w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                  )}

                  <div className="relative z-10">
                    <div className="font-medium truncate text-gray-100">
                      {player.player_list_nickname}
                    </div>
                  </div>

                  {/* 선택 표시 아이콘 */}
                  {selectedAwardPlayers[index]?.player_list_idx ===
                    player.player_list_idx && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-grass rounded-full flex items-center justify-center shadow-sm">
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
          <div className="mt-2 p-2 border rounded-md bg-grass/10 border-grass/30 text-xs flex items-center shadow-sm">
            <div className="flex-shrink-0 mr-2">
              <div className="w-5 h-5 bg-grass rounded-full flex items-center justify-center text-white shadow-sm">
                <img className="w-3 h-3" src={down_blue} />
              </div>
            </div>
            <div className="flex-1">
              <div className="font-medium text-grass">
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
