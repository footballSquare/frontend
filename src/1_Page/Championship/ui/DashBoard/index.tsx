import React from "react";
import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListTab from "./ui/MatchListTab";
import TeamListPanel from "./ui/TeamListPanel";
import PlayerTab from "./ui/PlayerTab";

import useManageMatchList from "./model/useManageMatchList";
import { convertToMatchData } from "./lib/convertToMatchData";
import { ACTIVE_TAB, activeTabList } from "./constant/activeTab";

import useGetChampionshipTeams from "../../../../3_Entity/Championship/useGetChampionshipTeams";
import useGetChampionshipMatchList from "../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
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
          <section className="w-full mx-auto bg-gray-800 rounded-lg shadow-md">
            <MatchListTab
              matchList={displayMatchList}
              filteredTeamList={filteredTeamList}
              matchHandlers={matchHandlers}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default DashBoard;
