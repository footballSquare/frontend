import React from "react";
import MatchListTab from "./ui/MatchListTab";
import useGetChampionshipMatchListHandler from "./model/useGetChampionshipMatchListHandler";
import { convertToMatchData } from "./lib/convertToMatchData";
import { ACTIVE_TAB, activeTabList } from "./constant/activeTab";
import useGetChampionshipTeams from "../../../../3_Entity/Championship/useGetChampionshipTeams";

import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useChampionshipInfoContext from "../../../../4_Shared/model/useChampionshipInfoContext";
import PlayerStatsTab from "./ui/PlayerStatsTab";
import useGetPlayerStatsHandler from "./model/useGetPlayerStatsHandler";
import TeamHistoryTab from "./ui/TeamHistoryTab";
import TeamListTab from "./ui/TeamListTab";

const DashBoard = (props: DashBoardProps) => {
  const { championship_type_idx } = props;
  const isLeague = championship_type_idx === 0;
  const { championshipListColor } = useChampionshipInfoContext();

  // api
  const championshipIdx = useParamInteger("championshipIdx");
  const [teamList] = useGetChampionshipTeams(championshipIdx); // 대회 참가 팀리스트

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

  // state
  const [activeTab, setActiveTab] = React.useState(ACTIVE_TAB.MATCHES);

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
          <TeamHistoryTab
            teamList={teamList}
            isLeague={isLeague}
            leagueData={leagueData}
            tournamentData={tournamentData}
          />
        )}

        {/* 매치 목록 탭  */}
        {activeTab === ACTIVE_TAB.MATCHES && (
          <MatchListTab
            matchList={optimisticMatchList}
            filteredTeamList={filteredTeamList}
            matchHandlers={matchHandlers}
            handleUpdatePlayer={handleUpdatePlayer}
          />
        )}

        {/* 참가 팀 목록 탭 */}
        {activeTab === ACTIVE_TAB.TEAM_LIST && (
          <TeamListTab teamList={teamList} />
        )}
      </main>
    </div>
  );
};

export default DashBoard;
