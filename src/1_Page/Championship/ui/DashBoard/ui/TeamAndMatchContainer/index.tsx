import { convertToLeague } from "./util/convertToLeague";
import { convertToTournamentFormat } from "./util/convertToTournamentFormat";
import { convertToFilterMatchList } from "./util/convertToFilterMatchList";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListContainer from "./ui/MatchListContainer";

import { ACTIVE_TAB } from "../../constant/activeTab";
import useManageMatchList from "./model/useManageMatchList";

import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetChampionshipTeamList from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";

const TeamAndMatchContainer = (props: TeamAndMatchContainerProps) => {
  const { championshipIdx, championship_type, activeTab } = props;
  const isLeague = championship_type === 0;

  const [matchList] = useGetChampionshipMatchList(championshipIdx);
  const [teamList] = useGetChampionshipTeamList(championshipIdx);
  const [displayMatchList, handleDeleteMatch, handleAddMatch] =
    useManageMatchList(matchList, teamList);

  const tournamentData = isLeague
    ? []
    : convertToTournamentFormat(displayMatchList, teamList, championshipIdx);

  const filteredTeamList = isLeague
    ? teamList
    : convertToFilterMatchList(displayMatchList, teamList, tournamentData);

  return (
    <div>
      <div className={activeTab === ACTIVE_TAB.TEAM ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket
            leagueData={convertToLeague(displayMatchList, teamList)}
          />
        ) : (
          <TournamentBracket tournamentData={tournamentData} />
        )}
      </div>
      <div className={activeTab === ACTIVE_TAB.MATCH ? "block" : "hidden"}>
        <MatchListContainer
          matchList={displayMatchList}
          filteredTeamList={filteredTeamList}
          handleDeleteMatch={handleDeleteMatch}
          handleAddMatch={handleAddMatch}
        />
      </div>
    </div>
  );
};

export default TeamAndMatchContainer;
