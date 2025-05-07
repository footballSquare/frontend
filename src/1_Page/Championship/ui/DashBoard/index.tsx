import React from "react";
import PlayerRow from "./ui/PlayerRow";
import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import useManageMatchList from "./model/useManageMatchList";
import { convertToMatchData } from "./util/convertToMatchData";
import MatchLineupContainer from "./ui/MatchLineupContainer";

import { ACTIVE_TAB, activeTabList } from "./constant/activeTab";
import useGetChampionshipTeams from "../../../../3_Entity/Championship/useGetChampionshipTeams";
import useGetChampionshipMatchList from "../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetPlayerStats from "../../../../3_Entity/Championship/useGetPlayerStats";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useSelectHandler from "./model/useSelectHandler";
import useGetChampionshipDetail from "../../../../3_Entity/Championship/useGetChampionshipDetail";
import ChampionshipMatchCardContainer from "./ui/ChampionshipMatchCardContainer";
import TeamListPanel from "./ui/TeamListPanel";

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
  const [activeTab, setActiveTab] = React.useState<ACTIVE_TAB>(
    ACTIVE_TAB.PLAYERS
  );
  const [selectedIdx, selectedTeams, handleSelect] =
    useSelectHandler(matchList);

  // optimistic state
  const [displayMatchList, matchHandlers] = useManageMatchList(matchList);
  const convertedData = React.useMemo(() => {
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
    <div className="w-full p-4">
      <nav className="flex justify-between items-center mb-4">
        <div className="flex overflow-x-auto space-x-2 p-2 rounded-md scrollbar-hide">
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
          <section className="w-full mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-t-lg shadow-md">
              <h2 className="text-white font-bold text-lg md:text-xl">
                선수 통계
              </h2>
              <p className="text-blue-100 text-xs md:text-sm">
                클릭하여 선수 프로필을 확인하세요
              </p>
            </div>
            <div className="rounded-b-lg shadow-lg border border-gray-200 overflow-x-auto">
              <table className="w-full bg-white min-w-[600px]">
                {/* 헤더 */}
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs">
                  <tr>
                    <th className="px-2 py-2 text-left font-semibold w-1/6">
                      선수
                    </th>
                    <th className="px-2 py-2 w-1/12 font-semibold">득점</th>
                    <th className="px-2 py-2 w-1/12 font-semibold">어시스트</th>
                    <th className="px-2 py-2 w-1/12 font-semibold">패스</th>
                    <th className="px-2 py-2 w-1/12 font-semibold">드리블</th>
                    <th className="px-2 py-2 w-1/12 font-semibold">태클</th>
                    <th className="px-2 py-2 w-1/12 font-semibold">점유율</th>
                    <th className="px-2 py-2 w-1/6 font-semibold">증거</th>
                  </tr>
                </thead>
                <tbody>
                  {playerStats.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-4 text-gray-500">
                        선수 통계가 없습니다.
                      </td>
                    </tr>
                  )}
                  {playerStats.map((player, index) => (
                    <PlayerRow player={player} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 팀 and 매치 목록 */}
        {activeTab === ACTIVE_TAB.TEAMS && (
          <section>
            {isLeague ? (
              <LeagueBracket leagueData={convertedData.leagueData} />
            ) : (
              <TournamentBracket
                tournamentData={convertedData.tournamentData}
              />
            )}
          </section>
        )}

        {/* 매치 목록 탭  */}
        {activeTab === ACTIVE_TAB.MATCHES && (
          <section className="w-full mx-auto flex flex-col md:flex-row gap-4">
            {/* 매치 결과 리스트 (좌측) */}
            <ChampionshipMatchCardContainer
              matchHandlers={matchHandlers}
              fetchMatchList={fetchMatchList}
              filteredTeamList={convertedData.filteredTeamList}
              matchList={displayMatchList}
              selectedIdx={selectedIdx}
              handleSelect={handleSelect}
            />

            {/* MatchLineup (반응형 적용) */}
            <div className="flex-1 min-h-[500px] bg-gray-100 p-4 overflow-x-auto md:overflow-visible">
              <MatchLineupContainer
                matchIdx={selectedIdx}
                selectedTeams={selectedTeams}
                championshipDetail={championshipDetail}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
export default DashBoard;
