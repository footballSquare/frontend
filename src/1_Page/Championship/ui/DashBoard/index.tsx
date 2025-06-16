import React from "react";
import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import ChampionshipMatchCardContainer from "./ui/ChampionshipMatchCardContainer";
import TeamListPanel from "./ui/TeamListPanel";
import MatchLineupContainer from "./ui/MatchLineupContainer";

import useManageMatchList from "./model/useManageMatchList";
import { convertToMatchData } from "./lib/convertToMatchData";
import { ACTIVE_TAB, activeTabList } from "./constant/activeTab";
import useGetChampionshipTeams from "../../../../3_Entity/Championship/useGetChampionshipTeams";
import useGetChampionshipMatchList from "../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useSelectHandler from "./model/useSelectHandler";
import useGetChampionshipDetail from "../../../../3_Entity/Championship/useGetChampionshipDetail";
import PlayerTab from "./ui/PlayerTab";
import useChampionshipInfoContext from "../../../../4_Shared/model/useChampionshipInfoContext";

const DashBoard = (props: DashBoardProps) => {
  const { championship_type_idx } = props;
  const isLeague = championship_type_idx === 0;
  const championshipIdx = useParamInteger("championshipIdx");
  const { championshipListColor } = useChampionshipInfoContext();

  // api
  const [matchList] = useGetChampionshipMatchList(championshipIdx); // 대회 생성된 매치 리스트
  const [teamList] = useGetChampionshipTeams(championshipIdx); // 대회 참가 팀리스트

  // state
  const [activeTab, setActiveTab] = React.useState(ACTIVE_TAB.PLAYERS);
  const [isMatchDetailView, setIsMatchDetailView] = React.useState(false); // 매치 상세 보기 상태
  const [
    selectChampionshipMatchIdx,
    selectMatchIdx,
    selectedTeams,
    handleSelect,
  ] = useSelectHandler(matchList);

  // 매치 선택 및 상세 보기로 전환하는 핸들러
  const handleMatchSelect = React.useCallback(
    (championshipMatchIdx: number) => {
      handleSelect(championshipMatchIdx);
      setIsMatchDetailView(true);
    },
    [handleSelect]
  );

  // 매치 리스트로 돌아가는 핸들러
  const handleBackToList = React.useCallback(() => {
    setIsMatchDetailView(false);
  }, []);

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

  // api 이미 호출된 idx는 캐싱을 통해 데이터 최적화
  const [championshipDetail] = useGetChampionshipDetail(
    selectChampionshipMatchIdx
  );

  return (
    <div className="w-full p-4 bg-gray-900 text-gray-100 min-h-screen">
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
        <TeamListPanel teamList={teamList} />
      </nav>

      <main className="pt-2">
        {/* 출전선수 목록 */}
        <div hidden={activeTab !== ACTIVE_TAB.PLAYERS}>
          <PlayerTab />
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
          <section className="w-full mx-auto">
            {!isMatchDetailView ? (
              /* 매치 리스트 보기 */
              <div className="bg-gray-800 rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">⚽</span>
                    </div>
                    매치 목록
                  </h2>
                  <p className="text-gray-400">
                    대회의 모든 매치를 확인하고 상세 정보를 볼 수 있습니다.
                    매치를 클릭하여 선수 라인업과 통계를 확인하세요.
                  </p>
                  {displayMatchList.length > 0 && (
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                      <span>총 {displayMatchList.length}개 매치</span>
                      <span>•</span>
                      <span>
                        완료된 매치:{" "}
                        {
                          displayMatchList.filter(
                            (m) =>
                              m.championship_match_first.common_status_idx === 4
                          ).length
                        }
                        개
                      </span>
                    </div>
                  )}
                </div>
                <ChampionshipMatchCardContainer
                  selectedIdx={selectChampionshipMatchIdx}
                  matchList={displayMatchList}
                  filteredTeamList={filteredTeamList}
                  matchHandlers={matchHandlers}
                  handleSelect={handleMatchSelect}
                  isListViewMode={true}
                />
              </div>
            ) : (
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
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-xl">📊</span>
                        </div>
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
                    selectedTeams={selectedTeams}
                    championshipDetail={championshipDetail}
                  />
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
