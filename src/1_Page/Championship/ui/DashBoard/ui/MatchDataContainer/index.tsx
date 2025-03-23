import { convertToLeague } from "./util/convertToLeague";
import { convertToTournamentFormat } from "./util/convertToTournamentFormat";

import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";
import MatchContainer from "./ui/MatchContainer";

import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";

const MatchDataContainer = (props: MatchDataContainerProps) => {
  const { championshipIdx, isLeague, activeTab } = props;
  const [matchList] = useGetChampionshipMatchList(championshipIdx);
  return (
    <div>
      <div className={activeTab === "teams" ? "block" : "hidden"}>
        {isLeague ? (
          <LeagueBracket teamStats={convertToLeague(matchList)} />
        ) : (
          <TournamentBracket rounds={convertToTournamentFormat(matchList)} />
        )}
      </div>
      <div className={activeTab === "matches" ? "block" : "hidden"}>
        <MatchContainer matchList={matchList} />
      </div>
    </div>
  );
};

export default MatchDataContainer;
