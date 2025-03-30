import React from "react";
import { ACTIVE_TAB } from "../../constant/activeTab";
import { convertToMatchData } from "./util/convertToMatchData";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListTab from "./ui/MatchListTab";

import useManageMatchList from "./model/useManageMatchList";
import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetChampionshipTeamList from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";
import useParamInteger from "../../../../../../4_Shared/model/useParamInteger";

const TeamAndMatchTab = (props: TeamAndMatchTabProps) => {
  const { championship_type, activeTab } = props;
  const isLeague = championship_type === 0;
  const championshipIdx = useParamInteger("championshipIdx");

  const [matchList] = useGetChampionshipMatchList(championshipIdx); // 대회 생성된 매치 리스트
  const [teamList] = useGetChampionshipTeamList(championshipIdx); // 대회 참가 팀리스트
  const [displayMatchList, matchHandlers] = useManageMatchList(
    matchList,
    teamList
  ); // 매치 리스트 관리
  const convertedData = React.useMemo(() => {
    return convertToMatchData(
      displayMatchList,
      teamList,
      championshipIdx,
      isLeague
    );
  }, [displayMatchList, teamList, championshipIdx, isLeague]);

  return (
    <div>
      {/* 팀 목록 탭 */}
      <div className={activeTab === ACTIVE_TAB.TEAMS ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket leagueData={convertedData.leagueData} />
        ) : (
          <TournamentBracket tournamentData={convertedData.tournamentData} />
        )}
      </div>

      {/* 매치 목록 탭  */}
      <div className={activeTab === ACTIVE_TAB.MATCHES ? "block" : "hidden"}>
        <MatchListTab
          matchList={displayMatchList}
          filteredTeamList={convertedData.filteredTeamList}
          matchHandlers={matchHandlers}
        />
      </div>
    </div>
  );
};

export default TeamAndMatchTab;
