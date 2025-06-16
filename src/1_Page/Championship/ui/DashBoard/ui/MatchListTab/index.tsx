import ChampionshipMatchCard from "./ui/ChampionshipMatchCard";
import CreateChampionMatchPanel from "./ui/CreateChampionMatchPanel";
import useSortHandler from "./model/useSortHandler";

import useChampionshipInfoContext from "../../../../../../4_Shared/model/useChampionshipInfoContext";
import useSelectHandler from "../../model/useSelectHandler";
import useGetChampionshipDetail from "../../../../../../3_Entity/Championship/useGetChampionshipDetail";
import MatchLineupContainer from "./ui/MatchLineupContainer";
import EmptySearchResult from "./ui/EmptySearchResult";
import { getSelectedMatchTeams } from "./lib/getSelectedMatchTeams";

const MatchListTab = (props: MatchListTabProps) => {
  const { matchList, filteredTeamList, matchHandlers } = props;

  const {
    selectChampionshipMatchIdx,
    selectMatchIdx,
    isMatchDetailView,
    handleMatchSelect,
    handleBackToList,
  } = useSelectHandler(matchList);

  // api 이미 호출된 idx는 캐싱을 통해 데이터 최적화
  const [championshipDetail] = useGetChampionshipDetail(
    selectChampionshipMatchIdx
  );

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
    <div>
      {isMatchDetailView ? (
        /* 매치 상세 보기 */
        <div className="bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-200 hover:text-white group">
                <span className="text-lg group-hover:translate-x-[-2px] transition-transform">
                  ←
                </span>
                매치 목록으로
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  매치 상세 정보
                </h2>
                <p className="text-gray-400 mt-1">
                  선수 포지션, 경기 통계, 그리고 상세 데이터를 확인하세요
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <MatchLineupContainer
              championshipMatchIdx={selectChampionshipMatchIdx}
              matchIdx={selectMatchIdx}
              selectedTeams={getSelectedMatchTeams(
                matchList,
                selectChampionshipMatchIdx
              )}
              championshipDetail={championshipDetail}
            />
          </div>
        </div>
      ) : (
        /* 매치 리스트 보기 */
        <div className="bg-gray-800 rounded-lg shadow-md">
          {/* 헤더 */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-xl">⚽</span>
              </div>
              매치 목록
            </h2>
            <p className="text-gray-400">
              대회의 모든 매치를 확인하고 상세 정보를 볼 수 있습니다. 매치를
              클릭하여 선수 라인업과 통계를 확인하세요.
            </p>
            {matchList.length > 0 && (
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span>총 {matchList.length}개 매치</span>
                <span>•</span>
                <span>
                  완료된 매치:{" "}
                  {
                    matchList.filter(
                      (m) => m.championship_match_first.common_status_idx === 4
                    ).length
                  }
                  개
                </span>
              </div>
            )}
          </div>

          {/* 관리자 전용 매치 생성 패널 */}
          {(isCommunityOperator || isCommunityManager) && (
            <div className="p-6">
              <CreateChampionMatchPanel
                handleBackToList={handleBackToList}
                handleMatchSelect={handleMatchSelect}
                handleAddMatch={matchHandlers.handleAddMatch}
                handleSyncMatchIdx={matchHandlers.handleSyncMatchIdx}
                handleDeleteMatch={matchHandlers.handleDeleteMatch}
                filteredTeamList={filteredTeamList}
              />
            </div>
          )}

          {/* 검색 및 정렬 영역 */}
          <div className="p-6 space-y-4">
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

          {/* 매치 카드 리스트 */}
          {/* 데스크톱: Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
            {sortedMatches.length === 0 ? (
              <div className="col-span-full">
                <EmptySearchResult searchTerm={searchTerm} />
              </div>
            ) : (
              sortedMatches.map((match, index) => (
                <div
                  key={`match-list-${index}`}
                  className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2">
                  <ChampionshipMatchCard
                    {...matchHandlers}
                    isSelected={
                      selectChampionshipMatchIdx ===
                      match.championship_match_idx
                    }
                    handleSelect={handleMatchSelect}
                    match={match}
                    isListViewMode={true}
                  />
                </div>
              ))
            )}
          </div>

          {/* 모바일: List */}
          <div className="md:hidden p-6">
            <div className="space-y-6 max-h-[500px] overflow-y-auto modern-scrollbar pr-2">
              {sortedMatches.length === 0 ? (
                <EmptySearchResult searchTerm={searchTerm} />
              ) : (
                sortedMatches.map((match, index) => (
                  <div
                    key={`match-list-${index}`}
                    className="transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                    <ChampionshipMatchCard
                      {...matchHandlers}
                      isSelected={
                        selectChampionshipMatchIdx ===
                        match.championship_match_idx
                      }
                      handleSelect={handleMatchSelect}
                      match={match}
                      isListViewMode={false}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchListTab;
