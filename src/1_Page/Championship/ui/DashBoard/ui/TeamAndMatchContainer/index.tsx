import { convertToLeague } from "./util/convertToLeague";
import { convertToTournamentFormat } from "./util/convertToTournamentFormat";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListContainer from "./ui/MatchListContainer";

import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetChampionshipTeamList from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";
import { ACTIVE_TAB } from "../../constant/activeTab";
import useManageMatchList from "./model/useManageMatchList";

const TeamAndMatchContainer = (props: TeamAndMatchContainerProps) => {
  const { championshipIdx, championship_type, activeTab } = props;
  const [matchList] = useGetChampionshipMatchList(championshipIdx);
  const [teamList] = useGetChampionshipTeamList(championshipIdx);

  const [displayMatchList, handleDeleteMatch, handleAddMatch] =
    useManageMatchList(matchList, teamList);

  const isLeague = championship_type === 0;

  let convertedData: TournamentData[] | LeagueData[] = [];
  let eliminatedTeams: number[] = [];

  if (isLeague) {
    [convertedData] = convertToLeague(displayMatchList, teamList);
  } else {
    [convertedData, eliminatedTeams] = convertToTournamentFormat(
      displayMatchList,
      teamList,
      championship_type
    );
  }
  const filteredTeamList = teamList.filter(
    (team) => !eliminatedTeams.includes(team.team_list_idx)
  );

  return (
    <div>
      <div className={activeTab === ACTIVE_TAB.TEAM ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket leagueData={convertedData as LeagueData[]} />
        ) : (
          <TournamentBracket
            tournamentData={convertedData as TournamentData[]}
          />
        )}
      </div>
      <div className={activeTab === ACTIVE_TAB.MATCH ? "block" : "hidden"}>
        <MatchListContainer
          handleDeleteMatch={handleDeleteMatch}
          handleAddMatch={handleAddMatch}
          matchList={displayMatchList}
          filteredTeamList={filteredTeamList}
        />
      </div>
    </div>
  );
};

export default TeamAndMatchContainer;
