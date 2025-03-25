import { convertToLeague } from "./util/convertToLeague";
import { convertToTournamentFormat } from "./util/convertToTournamentFormat";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchListContainer from "./ui/MatchListContainer";

import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useGetChampionshipTeamList from "../../../../../../3_Entity/Championship/useGetChampionshipTeams";
import { ACTIVE_TAB } from "../../constant/activeTab";

const TeamAndMatchContainer = (props: TeamAndMatchContainerProps) => {
  const { championshipIdx, isLeague, activeTab } = props;
  const [matchList] = useGetChampionshipMatchList(championshipIdx);
  const [teamList] = useGetChampionshipTeamList(championshipIdx);
  return (
    <div>
      <div className={activeTab === ACTIVE_TAB.TEAM ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket teamStats={convertToLeague(matchList, teamList)} />
        ) : (
          <TournamentBracket
            rounds={convertToTournamentFormat(matchList, teamList)}
          />
        )}
      </div>
      <div className={activeTab === ACTIVE_TAB.MATCH ? "block" : "hidden"}>
        <MatchListContainer matchList={matchList} />
      </div>
    </div>
  );
};

export default TeamAndMatchContainer;
