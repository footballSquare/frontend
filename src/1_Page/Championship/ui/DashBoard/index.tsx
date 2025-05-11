import React from "react";
import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import ChampionshipMatchCardContainer from "./ui/ChampionshipMatchCardContainer";
import TeamListPanel from "./ui/TeamListPanel";
import MatchLineupContainer from "./ui/MatchLineupContainer";

import useManageMatchList from "./model/useManageMatchList";
import { convertToMatchData } from "./util/convertToMatchData";
import { ACTIVE_TAB, activeTabList } from "./constant/activeTab";
import useGetChampionshipTeams from "../../../../3_Entity/Championship/useGetChampionshipTeams";
import useGetChampionshipMatchList from "../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetPlayerStats from "../../../../3_Entity/Championship/useGetPlayerStats";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useSelectHandler from "./model/useSelectHandler";
import useGetChampionshipDetail from "../../../../3_Entity/Championship/useGetChampionshipDetail";
import PlayerTab from "./ui/PlayerTab";

const DashBoard = (props: DashBoardProps) => {
  const { championship_type_idx } = props;
  const isLeague = championship_type_idx === 0;
  const championshipIdx = useParamInteger("championshipIdx");

  // api
  const [playerStats] = useGetPlayerStats(championshipIdx);
  const [matchList, fetchMatchList] =
    useGetChampionshipMatchList(championshipIdx); // 대회 생성된 매치 리스트
  const [teamList] = useGetChampionshipTeams(championshipIdx); // 대회 참가 팀리스트

  // state
  const [activeTab, setActiveTab] = React.useState(ACTIVE_TAB.PLAYERS);
  const [selectedIdx, selectedTeams, handleSelect] =
    useSelectHandler(matchList);

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
  const [championshipDetail] = useGetChampionshipDetail(selectedIdx);

  return (
    <div className="w-full p-4 bg-gray-50 min-h-screen">
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex overflow-x-auto space-x-2 p-2 rounded-md scrollbar-hide bg-white shadow-sm">
          {activeTabList.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              {label}
            </button>
          ))}
        </div>
        <TeamListPanel teamList={teamList} />
      </nav>

      <main className="pt-2">
        {/* 출전선수 목록 */}
        {activeTab === ACTIVE_TAB.PLAYERS && (
          <PlayerTab playerStats={playerStats} />
        )}

        {/* 팀 기록 탭 */}
        {activeTab === ACTIVE_TAB.TEAMS && (
          <section className="bg-white rounded-lg shadow-md p-4">
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
          <section className="w-full mx-auto flex flex-col md:flex-row gap-4">
            {/* 매치 결과 리스트 (좌측) */}
            <ChampionshipMatchCardContainer
              selectedIdx={selectedIdx}
              matchList={displayMatchList}
              filteredTeamList={filteredTeamList}
              matchHandlers={matchHandlers}
              fetchMatchList={fetchMatchList}
              handleSelect={handleSelect}
            />

            {/* MatchLineup (반응형 적용) */}
            <div className="flex-1 min-h-[500px] bg-white rounded-lg shadow-md p-4 overflow-hidden">
              (
              <MatchLineupContainer
                matchIdx={selectedIdx}
                selectedTeams={selectedTeams}
                championshipDetail={championshipDetail}
              />
              )
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DashBoard;
