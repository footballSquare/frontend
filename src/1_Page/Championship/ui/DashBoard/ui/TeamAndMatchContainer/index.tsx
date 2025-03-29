import React from "react";
import { ACTIVE_TAB } from "../../constant/activeTab";

import { convertToMatchData } from "./util/convertToMatchData";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListContainer from "./ui/MatchListContainer";

import useManageMatchList from "./model/useManageMatchList";
import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetChampionshipTeamList from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";

const TeamAndMatchContainer = (props: TeamAndMatchContainerProps) => {
  const { championshipIdx, championship_type, activeTab } = props;
  const isLeague = championship_type === 0;

  const [matchList] = useGetChampionshipMatchList(championshipIdx); // 대회 생성된 매치 리스트
  const [teamList] = useGetChampionshipTeamList(championshipIdx); // 대회 참가 팀리스트
  const [displayMatchList, handleDeleteMatch, handleAddMatch] =
    useManageMatchList(matchList, teamList); // 매치 리스트 관리

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
      <div className={activeTab === ACTIVE_TAB.TEAM ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket leagueData={convertedData.leagueData} />
        ) : (
          <TournamentBracket tournamentData={convertedData.tournamentData} />
        )}
      </div>

      <div className={activeTab === ACTIVE_TAB.MATCH ? "block" : "hidden"}>
        <MatchListContainer
          matchList={displayMatchList}
          filteredTeamList={convertedData.filteredTeamList}
          handleDeleteMatch={handleDeleteMatch}
          handleAddMatch={handleAddMatch}
        />
      </div>
    </div>
  );
};

export default TeamAndMatchContainer;
