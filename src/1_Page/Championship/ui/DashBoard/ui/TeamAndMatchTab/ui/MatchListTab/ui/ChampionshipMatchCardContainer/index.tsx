import ChampionshipMatchCard from "./ui/ChampionshipMatchCard";
import MatchAddModalWithButton from "./ui/MatchAddModalWithButton";
import useSortHandler from "./model/useSortHandler";

const isAdmin = true;
const ChampionshipMatchCardContainer = (
  props: ChampionshipMatchCardContainerProps
) => {
  const {
    matchList,
    filteredTeamList,
    selectedIdx,
    handleSelect,
    matchHandlers,
  } = props;

  const {
    searchTerm,
    sortOption,
    handleSearchChange,
    handleSortChange,
    sortedMatches,
  } = useSortHandler(matchList);

  return (
    <div className="sm:max-w-[300px] w-full flex-shrink-0">
      <h2 className="text-lg font-bold text-blue-700 mb-4">매치 결과</h2>
      {/* 검색 및 정렬 옵션 UI */}
      <div className="flex justify-end">
        {isAdmin && (
          <MatchAddModalWithButton
            filteredTeamList={filteredTeamList}
            handleAddMatch={matchHandlers.handleAddMatch}
          />
        )}
      </div>
      <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="🔍 팀명 검색"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
          <option value="default">정렬 없음</option>
          <option value="asc">매치번호 ↑</option>
          <option value="desc">매치번호 ↓</option>
        </select>
      </div>

      <ul className="w-full max-h-[470px] flex flex-row space-x-3 overflow-x-scroll overflow-y-hidden sm:flex-col sm:space-x-0 sm:space-y-3 sm:overflow-x-hidden sm:overflow-y-scroll cursor-pointer items-center">
        {sortedMatches.length === 0 && (
          <li className="w-full text-center text-gray-400">
            검색 결과가 없습니다.
          </li>
        )}
        {sortedMatches.map((match, index) => (
          <ChampionshipMatchCard
            handleEndMatch={matchHandlers.handleEndMatch}
            handleDeleteMatch={matchHandlers.handleDeleteMatch}
            selectedIdx={selectedIdx}
            handleSelect={handleSelect}
            match={match}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChampionshipMatchCardContainer;
