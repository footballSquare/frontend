import { convertToLeague } from "./util/convertToLeague";
import { convertToTournamentFormat } from "./util/convertToTournamentFormat";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListContainer from "./ui/MatchListContainer";

import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetChampionshipTeamList from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";
import { ACTIVE_TAB } from "../../constant/activeTab";

const TeamAndMatchContainer = (props: TeamAndMatchContainerProps) => {
  const { championshipIdx, championship_type, activeTab } = props;
  const [matchList, loading, refetch] =
    useGetChampionshipMatchList(championshipIdx);

  const [teamList] = useGetChampionshipTeamList(championshipIdx);
  const isLeague = championship_type === 0;

  if (loading) <div>로딩중</div>;
  return (
    <div>
      <div className={activeTab === ACTIVE_TAB.TEAM ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket leagueData={convertToLeague(matchList, teamList)} />
        ) : (
          <TournamentBracket
            tournamentData={convertToTournamentFormat(
              matchList,
              teamList,
              championship_type
            )}
          />
        )}
      </div>
      <div className={activeTab === ACTIVE_TAB.MATCH ? "block" : "hidden"}>
        <MatchListContainer
          refetch={refetch}
          matchList={matchList}
          teamList={teamList}
        />
      </div>
    </div>
  );
};

export default TeamAndMatchContainer;
