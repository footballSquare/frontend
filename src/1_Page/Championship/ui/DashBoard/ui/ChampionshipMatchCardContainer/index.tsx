import ChampionshipMatchCard from "./ui/ChampionshipMatchCard";
import CreateChampionMatchPanel from "./ui/CreateChampionMatchPanel";
import useSortHandler from "./model/useSortHandler";

import useChampionshipInfoContext from "../../../../../../4_Shared/model/useChampionshipInfoContext";

const ChampionshipMatchCardContainer = (
  props: ChampionshipMatchCardContainerProps
) => {
  const {
    selectedIdx,
    matchList,
    filteredTeamList,
    matchHandlers,
    handleSelect,
    isListViewMode = false, // 기본값은 false
  } = props;

  // admin
  const { isCommunityOperator, isCommunityManager } =
    useChampionshipInfoContext();

  // state
  const {
    searchTerm,
    sortOption,
    handleSearchChange,
    handleSortChange,
    sortedMatches,
  } = useSortHandler(matchList);

  return (
    <div className={`${isListViewMode ? "w-full" : "w-full max-w-sm"}`}>
      {!isListViewMode && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-xl">⚽</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">매치 리스트</h2>
              <p className="text-gray-400 text-sm">
                경기를 선택해 상세 정보를 확인하세요
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 플로팅 검색 패널 */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
          {/* 관리자 버튼 */}
          {(isCommunityOperator || isCommunityManager) && (
            <div className="mb-6">
              <CreateChampionMatchPanel
                handleSelect={handleSelect}
                handleAddMatch={matchHandlers.handleAddMatch}
                handleSyncMatchIdx={matchHandlers.handleSyncMatchIdx}
                filteredTeamList={filteredTeamList}
              />
            </div>
          )}

          {/* 검색 및 정렬 */}
          <div className="space-y-4">
            {/* 검색창 */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white text-xs">🔍</span>
                </div>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="팀명으로 검색하세요..."
                className="w-full pl-14 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 group-hover:bg-white/15"
              />
            </div>

            {/* 정렬 선택 */}
            <div className="relative group">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full appearance-none bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white cursor-pointer focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 group-hover:bg-white/15">
                <option value="default" className="bg-gray-800">
                  🎲 기본 순서
                </option>
                <option value="asc" className="bg-gray-800">
                  ⬆️ 번호 순 (오름차순)
                </option>
                <option value="desc" className="bg-gray-800">
                  ⬇️ 번호 순 (내림차순)
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 매치 리스트 - 카드 컨테이너 */}
      <div
        className={`
        ${
          isListViewMode
            ? "space-y-0"
            : "bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl"
        }
      `}>
        {isListViewMode ? (
          /* 리스트 뷰 - 현대적인 그리드 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
            {sortedMatches.length === 0 ? (
              <div className="col-span-full">
                <EmptyState searchTerm={searchTerm} />
              </div>
            ) : (
              sortedMatches.map((match, index) => (
                <div
                  key={`match-list-${index}`}
                  className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2">
                  <ChampionshipMatchCard
                    {...matchHandlers}
                    isSelected={selectedIdx === match.championship_match_idx}
                    handleSelect={handleSelect}
                    match={match}
                    isListViewMode={isListViewMode}
                  />
                </div>
              ))
            )}
          </div>
        ) : (
          /* 사이드바 뷰 - 세로 스크롤 카드 */
          <div className="p-6">
            <div className="space-y-6 max-h-[500px] overflow-y-auto modern-scrollbar pr-2">
              {sortedMatches.length === 0 ? (
                <EmptyState searchTerm={searchTerm} />
              ) : (
                sortedMatches.map((match, index) => (
                  <div
                    key={`match-list-${index}`}
                    className="transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                    <ChampionshipMatchCard
                      {...matchHandlers}
                      isSelected={selectedIdx === match.championship_match_idx}
                      handleSelect={handleSelect}
                      match={match}
                      isListViewMode={isListViewMode}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 빈 상태 컴포넌트
const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
  <div className="text-center py-20">
    <div className="flex flex-col items-center gap-8">
      <div className="w-24 h-24 bg-gradient-to-br from-white/10 via-white/15 to-white/5 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20">
        <span className="text-5xl">{searchTerm ? "🔍" : "⚽"}</span>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">
          {searchTerm ? "검색 결과가 없습니다" : "등록된 매치가 없습니다"}
        </h3>
        <p className="text-gray-300 max-w-md mx-auto leading-relaxed text-lg">
          {searchTerm
            ? `"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다. 다른 키워드로 시도해보세요.`
            : "아직 생성된 매치가 없습니다. 새로운 매치를 생성하여 대회를 시작해보세요."}
        </p>
        {searchTerm && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 font-semibold">
            전체 매치 보기
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ChampionshipMatchCardContainer;
