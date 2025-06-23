import React from "react";
import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListTab from "./ui/MatchListTab";
import TeamListPanel from "./ui/TeamListPanel";

import useManageMatchList from "./model/useManageMatchList";
import { convertToMatchData } from "./lib/convertToMatchData";
import { ACTIVE_TAB, activeTabList } from "./constant/activeTab";

import { sortColumns } from "./constant/sortColumns";
import useGetChampionshipTeams from "../../../../3_Entity/Championship/useGetChampionshipTeams";
import useGetChampionshipMatchList from "../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useChampionshipInfoContext from "../../../../4_Shared/model/useChampionshipInfoContext";
import useSearchHandler from "./model/useSearchHandler";
import useGetPlayerStats from "../../../../3_Entity/Championship/useGetPlayerStats";
import PlayerRow from "./ui/PlayerRow";

const DashBoard = (props: DashBoardProps) => {
  const { championship_type_idx } = props;
  const isLeague = championship_type_idx === 0;
  const championshipIdx = useParamInteger("championshipIdx");
  const { championshipListColor } = useChampionshipInfoContext();

  // api
  const [matchList] = useGetChampionshipMatchList(championshipIdx); // 대회 생성된 매치 리스트
  const [teamList] = useGetChampionshipTeams(championshipIdx); // 대회 참가 팀리스트
  const [playerStats] = useGetPlayerStats(championshipIdx);

  // state
  const [activeTab, setActiveTab] = React.useState(ACTIVE_TAB.MATCHES);

  // optimistic state
  const [displayMatchList, matchHandlers] = useManageMatchList(matchList);
  const { tournamentData, filteredTeamList, leagueData } = React.useMemo(() => {
    return convertToMatchData(
      displayMatchList,
      teamList,
      championship_type_idx,
      isLeague
    );
  }, [displayMatchList, teamList, championship_type_idx, isLeague]);
  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    displayPlayerStats,
    handleUpdatePlayer,
  } = useSearchHandler(playerStats);

  return (
    <div className="w-full p-4 bg-gray-900 text-gray-100 min-h-screen">
      {/* 대시보드 상단바 */}
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex overflow-x-auto space-x-2 p-2 rounded-md scrollbar-hide">
          {activeTabList.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
              style={
                activeTab === id
                  ? { backgroundColor: championshipListColor }
                  : undefined
              }>
              {label}
            </button>
          ))}
        </div>
        {/* 참가 팀 보기 패널 */}
        <TeamListPanel teamList={teamList} />
      </nav>

      <main className="pt-2">
        {/* 출전선수 목록 */}
        <div hidden={activeTab !== ACTIVE_TAB.PLAYERS}>
          <section className="w-full mx-auto bg-gray-900 text-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="mb-4 flex flex-col md:flex-row gap-2 items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="선수 또는 팀 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
              <button
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-600 text-gray-100"
                onClick={() => setSearchTerm("")}
                aria-label="검색 초기화">
                <span>필터 초기화</span>
              </button>
            </div>
            <div className="p-4 rounded-t-lg bg-gray-600">
              <h2 className="font-bold text-lg md:text-xl">
                <span>선수 통계</span>
              </h2>
              <p className="text-xs md:text-sm">
                클릭하여 선수 프로필을 확인하세요
              </p>
            </div>
            <hr className="border-gray-700" />
            <div className="overflow-x-hidden">
              <table className="w-full bg-gray-700 min-w-[600px] text-gray-100">
                {/* 헤더 */}
                <thead className="text-xs bg-gray-600 text-gray-400 uppercase tracking-wider">
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
                  {displayPlayerStats.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="bg-gray-700 rounded-full p-4 mb-2">
                            <span className="text-gray-400 text-xl">📊</span>
                          </div>
                          <p className="text-lg font-medium text-gray-100 mb-2">
                            {searchTerm
                              ? "검색 결과가 없습니다."
                              : "선수 통계가 없습니다."}
                          </p>
                          <p className="text-sm text-gray-400">
                            {searchTerm
                              ? "다른 검색어로 시도해보세요."
                              : "대회가 시작되면 통계가 추가됩니다."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayPlayerStats.map((player, index) => (
                      <PlayerRow
                        key={player.player_list_idx || index}
                        player={player}
                        index={index}
                      />
                    ))
                  )}
                </tbody>
              </table>
              {displayPlayerStats.length > 0 && (
                <div className="px-4 py-3 bg-gray-700 border-t border-gray-600 text-xs text-gray-400">
                  총 {displayPlayerStats.length}명의 선수{" "}
                  {searchTerm && `(검색: "${searchTerm}")`}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* 팀 기록 탭 */}
        {activeTab === ACTIVE_TAB.TEAMS && (
          <section className="bg-gray-800 rounded-lg shadow-md p-4">
            {teamList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="bg-gray-100 rounded-full p-4 mb-4">
                  <span className="text-gray-400 text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  팀 정보가 없습니다.
                </h3>
                <p className="text-sm text-gray-500">
                  대회에 참가 중인 팀이 없거나 아직 등록되지 않았습니다.
                </p>
              </div>
            ) : isLeague ? (
              <LeagueBracket leagueData={leagueData} />
            ) : (
              <TournamentBracket tournamentData={tournamentData} />
            )}
          </section>
        )}

        {/* 매치 목록 탭  */}
        {activeTab === ACTIVE_TAB.MATCHES && (
          <section className="w-full mx-auto bg-gray-800 rounded-lg shadow-md">
            <MatchListTab
              matchList={displayMatchList}
              filteredTeamList={filteredTeamList}
              matchHandlers={matchHandlers}
              handleUpdatePlayer={handleUpdatePlayer}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default DashBoard;
