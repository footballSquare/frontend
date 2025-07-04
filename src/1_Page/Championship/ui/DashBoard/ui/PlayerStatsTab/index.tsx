import useChampionshipInfoContext from "../../../../../../4_Shared/model/useChampionshipInfoContext";
import { sortColumns } from "./constant/sortColumns";
import useSearchHandler from "./model/useSearchHandler";
import PlayerRow from "./ui/PlayerRow";

const PlayerStatsTab = (props: PlayerStatsTabProps) => {
  const { playerStats } = props;
  const { championshipListColor } = useChampionshipInfoContext();

  // playerStats에 검색 로직 추가
  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    displayPlayerStats,
  } = useSearchHandler(playerStats);

  return (
    <section className="bg-gray-800 rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gray-800 rounded-full p-3">
            <span className="text-gray-300 text-xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-white">출전 선수 통계</h2>
        </div>
        <p className="text-gray-400">
          대회에 참가한 모든 선수들의 경기 통계를 확인할 수 있습니다.
        </p>
        {displayPlayerStats.length > 0 && (
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <span>총 {displayPlayerStats.length}명의 선수</span>
            {searchTerm && (
              <>
                <span>•</span>
                <span>검색: "{searchTerm}"</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* 검색 영역 */}
      <div className="p-8 border-b border-gray-600/50 bg-gradient-to-r from-gray-700/30 to-gray-600/30">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${championshipListColor}, ${championshipListColor}CC)`,
                }}>
                <span className="text-white text-sm font-bold">🔍</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="선수명 또는 팀명으로 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 "
            />
          </div>
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="overflow-hidden p-4">
        {displayPlayerStats.length === 0 ? (
          <div className="py-20 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-2xl font-bold text-white mb-3">
                {searchTerm ? "검색 결과가 없습니다" : "선수 통계가 없습니다"}
              </h3>
              <p className="text-gray-400 text-center max-w-md text-lg leading-relaxed">
                {searchTerm
                  ? "다른 검색어로 시도해보시거나 검색어를 확인해주세요."
                  : "대회가 시작되면 선수들의 경기 통계가 여기에 표시됩니다."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-6 px-8 py-4 text-gray-900 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.05]"
                  style={{
                    background: `linear-gradient(135deg, ${championshipListColor}, ${championshipListColor}CC)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${championshipListColor}E6, ${championshipListColor}B3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${championshipListColor}, ${championshipListColor}CC)`;
                  }}>
                  <span className="flex items-center gap-2">
                    <span>🔍</span>
                    전체 선수 보기
                  </span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto ">
            <table className="w-full min-w-[900px] text-gray-100">
              {/* 헤더 */}
              <thead>
                <tr className="bg-gradient-to-r from-gray-700/80 to-gray-700/60 border-b border-gray-600">
                  {sortColumns.map((col) => (
                    <th
                      key={col.key}
                      className={`${col.thClass} first:rounded-tl-xl last:rounded-tr-xl`}>
                      <button
                        className={`${col.buttonClass} transition-colors group flex items-center gap-2`}
                        onClick={() => handleSort(col.key)}
                        aria-label={col.ariaLabel}
                        style={
                          {
                            "--hover-color": championshipListColor,
                          } as React.CSSProperties
                        }
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = championshipListColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "";
                        }}>
                        <span>{col.label}</span>
                        {sortConfig.key === col.key ? (
                          <span
                            className="text-lg"
                            style={{ color: championshipListColor }}>
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        ) : (
                          <span
                            className="text-gray-500 text-sm transition-colors"
                            style={
                              {
                                "--hover-color": `${championshipListColor}80`,
                              } as React.CSSProperties
                            }
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = `${championshipListColor}80`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "";
                            }}>
                            ↕
                          </span>
                        )}
                      </button>
                    </th>
                  ))}
                  <th className="px-6 py-5 text-left font-bold text-gray-200 uppercase tracking-wider text-sm first:rounded-tl-xl last:rounded-tr-xl">
                    <div className="flex items-center gap-2">
                      <span>증거</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30 bg-gray-800/30">
                {displayPlayerStats.map((player, index) => (
                  <PlayerRow
                    key={player.player_list_idx || index}
                    player={player}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayerStatsTab;
