import PlayerRow from "./ui/PlayerRow";
import useSearchHandler from "./model/useSearchHandler";
import { sortColumns } from "./constant/sortColumns";

const PlayerTab = (props: PlayerTabProps) => {
  const { playerStats } = props;

  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    filteredPlayerStats,
  } = useSearchHandler(playerStats);

  return (
    <section className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="mb-4 flex flex-col md:flex-row gap-2 items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="선수 또는 팀 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="선수 또는 팀 검색"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          onClick={() => setSearchTerm("")}
          aria-label="검색 초기화">
          <span>필터 초기화</span>
        </button>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
        <h2 className="text-white font-bold text-lg md:text-xl">
          <span>선수 통계</span>
        </h2>
        <p className="text-blue-100 text-xs md:text-sm">
          클릭하여 선수 프로필을 확인하세요
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white min-w-[600px]">
          {/* 헤더 */}
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs">
            <tr>
              {sortColumns.map((col) => (
                <th key={col.key} className={col.thClass}>
                  <button
                    className={col.buttonClass}
                    onClick={() => handleSort(col.key)}
                    aria-label={col.ariaLabel}>
                    {col.label}
                    {sortConfig.key === col.key && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
              ))}
              <th className="px-3 py-3 w-1/6 font-semibold">증거</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayerStats.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="bg-gray-100 rounded-full p-4 mb-2">
                      <span className="text-gray-400 text-xl">📊</span>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {searchTerm
                        ? "검색 결과가 없습니다."
                        : "선수 통계가 없습니다."}
                    </p>
                    <p className="text-sm text-gray-500">
                      {searchTerm
                        ? "다른 검색어로 시도해보세요."
                        : "대회가 시작되면 통계가 추가됩니다."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPlayerStats.map((player, index) => (
                <PlayerRow
                  key={player.player_list_idx || index}
                  player={player}
                  index={index}
                />
              ))
            )}
          </tbody>
        </table>
        {filteredPlayerStats.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t text-xs text-gray-500">
            총 {filteredPlayerStats.length}명의 선수{" "}
            {searchTerm && `(검색: "${searchTerm}")`}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayerTab;
