import React from "react";
import { useNavigate } from "react-router-dom";
import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListTab from "./ui/MatchListTab";

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
  const navigate = useNavigate();

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
      <nav className="flex items-center justify-start mb-6">
        <div className="flex space-x-1 p-1 rounded-xl bg-gray-800">
          {activeTabList.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === id
                  ? "text-gray-900 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
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

        {/* 참가 팀 목록 탭 */}
        {activeTab === ACTIVE_TAB.TEAM_LIST && (
          <section className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: championshipListColor }}>
                  <span className="text-xl">🏆</span>
                </div>
                <h2 className="text-2xl font-bold text-white">참가 팀 목록</h2>
              </div>
              <p className="text-gray-400">
                대회에 참가 중인 모든 팀을 확인하고 팀 페이지로 이동할 수
                있습니다.
              </p>
              {teamList.length > 0 && (
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span>총 {teamList.length}개 팀 참가</span>
                </div>
              )}
            </div>

            {teamList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-gray-700 rounded-full p-6 mb-4">
                  <span className="text-gray-400 text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  참가 팀이 없습니다
                </h3>
                <p className="text-gray-400 text-center max-w-md">
                  아직 대회에 참가한 팀이 없습니다. 팀 등록이 완료되면 여기에
                  표시됩니다.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamList.map((team) => (
                  <div
                    key={team.team_list_idx}
                    className="group bg-white/5 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:scale-[1.02]"
                    onClick={() => {
                      navigate(`/team/${team.team_list_idx}`);
                    }}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {team.team_list_emblem ? (
                          <img
                            src={team.team_list_emblem}
                            alt={team.team_list_name}
                            className="w-16 h-16 object-contain rounded-xl bg-white/10 p-2"
                          />
                        ) : (
                          <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: team.team_list_color }}>
                            {team.team_list_short_name}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg group-hover:text-grass transition-colors">
                          {team.team_list_name}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">
                          {team.team_list_short_name}
                        </p>
                        <div
                          className="inline-block mt-2 px-2 py-1 rounded-md text-xs font-medium"
                          style={{
                            backgroundColor: `${team.team_list_color}20`,
                            color: team.team_list_color,
                          }}>
                          팀 페이지 보기
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-grass/20 transition-colors">
                          <span className="text-gray-400 group-hover:text-grass text-lg">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default DashBoard;
