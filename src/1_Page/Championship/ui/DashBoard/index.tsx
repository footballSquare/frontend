import React from "react";
import { useNavigate } from "react-router-dom";
import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListTab from "./ui/MatchListTab";

import useGetChampionshipMatchListHandler from "./model/useGetChampionshipMatchListHandler";
import { convertToMatchData } from "./lib/convertToMatchData";
import { ACTIVE_TAB, activeTabList } from "./constant/activeTab";

import useGetChampionshipTeams from "../../../../3_Entity/Championship/useGetChampionshipTeams";

import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useChampionshipInfoContext from "../../../../4_Shared/model/useChampionshipInfoContext";
import PlayerStatsTab from "./ui/PlayerStatsTab";
import useGetPlayerStatsHandler from "./model/useGetPlayerStatsHandler";

const DashBoard = (props: DashBoardProps) => {
  const { championship_type_idx } = props;
  const isLeague = championship_type_idx === 0;
  const championshipIdx = useParamInteger("championshipIdx");
  const { championshipListColor } = useChampionshipInfoContext();
  const navigate = useNavigate();

  // api
  const [teamList] = useGetChampionshipTeams(championshipIdx); // 대회 참가 팀리스트

  // state
  const [activeTab, setActiveTab] = React.useState(ACTIVE_TAB.MATCHES);

  // API with optimistic state
  const { optimisticPlayerStats, handleUpdatePlayer } =
    useGetPlayerStatsHandler();
  const { optimisticMatchList, matchHandlers } =
    useGetChampionshipMatchListHandler();

  const { tournamentData, filteredTeamList, leagueData } = React.useMemo(() => {
    return convertToMatchData(
      optimisticMatchList,
      teamList,
      championship_type_idx,
      isLeague
    );
  }, [optimisticMatchList, teamList, championship_type_idx, isLeague]);

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
          <PlayerStatsTab playerStats={optimisticPlayerStats} />
        </div>

        {/* 팀 기록 탭 */}
        {activeTab === ACTIVE_TAB.TEAMS && (
          <section className="bg-gray-800 rounded-lg shadow-md">
            {/* 헤더 */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-800 rounded-full p-3">
                  <span className="text-gray-300 text-xl">🏆</span>
                </div>
                <h2 className="text-2xl font-bold text-white">팀 기록</h2>
              </div>
              <p className="text-gray-400">
                대회 진행 상황과 팀별 순위를 브래킷 형태로 확인할 수 있습니다.
              </p>
            </div>

            <div className="p-4">
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
            </div>
          </section>
        )}

        {/* 매치 목록 탭  */}
        {activeTab === ACTIVE_TAB.MATCHES && (
          <section className="w-full mx-auto bg-gray-800 rounded-lg shadow-md">
            <MatchListTab
              matchList={optimisticMatchList}
              filteredTeamList={filteredTeamList}
              matchHandlers={matchHandlers}
              handleUpdatePlayer={handleUpdatePlayer}
            />
          </section>
        )}

        {/* 참가 팀 목록 탭 */}
        {activeTab === ACTIVE_TAB.TEAM_LIST && (
          <section className="bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-800 rounded-full p-3">
                  <span className="text-gray-300 text-xl">🏆</span>
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
              <div className="py-20 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-3xl p-8 mb-6 shadow-2xl">
                    <span className="text-gray-300 text-5xl">🏆</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    참가 팀이 없습니다
                  </h3>
                  <p className="text-gray-400 text-center max-w-md text-lg leading-relaxed">
                    아직 대회에 참가한 팀이 없습니다. 팀 등록이 완료되면 여기에
                    표시됩니다.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamList.map((team) => (
                    <div
                      key={team.team_list_idx}
                      className="group bg-white/5 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                      onClick={() => {
                        navigate(`/team/${team.team_list_idx}`);
                      }}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {team.team_list_emblem ? (
                            <img
                              src={team.team_list_emblem}
                              alt={team.team_list_name}
                              className="w-16 h-16 object-contain rounded-2xl bg-white/10 p-2 group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg"
                              style={{ backgroundColor: team.team_list_color }}>
                              {team.team_list_short_name}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-lg group-hover:text-grass transition-colors">
                            {team.team_list_name}
                          </h3>
                          <p className="text-gray-400 text-sm font-medium mb-2">
                            {team.team_list_short_name}
                          </p>
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium transition-all duration-300 group-hover:scale-105"
                            style={{
                              backgroundColor: `${team.team_list_color}20`,
                              color: team.team_list_color,
                            }}>
                            <span>팀 페이지 보기</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-grass/20 transition-all duration-300 group-hover:scale-110">
                            <span className="text-gray-400 group-hover:text-grass text-xl">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default DashBoard;
