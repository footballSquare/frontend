import ChampionshipMatchCardContainer from "./ui/ChampionshipMatchCardContainer";
import MatchLineupContainer from "./ui/MatchLineupContainer";
import { getSelectedMatchTeams } from "./util/select";
import useSelectHandler from "./model/useSelectHandler";
import React from "react";

const MatchListTab = (props: MatchListTabProps) => {
  const { matchList, filteredTeamList, handleAddMatch, handleDeleteMatch } =
    props;
  const [selectedIdx, handleSelect] = useSelectHandler(matchList);
  const selectedTeams = React.useMemo(
    () => getSelectedMatchTeams(matchList, selectedIdx),
    [matchList, selectedIdx]
  );
  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
      {/* 매치 결과 리스트 (좌측) */}
      <ChampionshipMatchCardContainer
        handleAddMatch={handleAddMatch}
        handleDeleteMatch={handleDeleteMatch}
        filteredTeamList={filteredTeamList}
        matchList={matchList}
        selectedIdx={selectedIdx}
        handleSelect={handleSelect}
      />

      {/* MatchLineup (반응형 적용) */}
      <div className="flex-1 min-h-[500px] bg-gray-100 p-4 overflow-x-auto md:overflow-visible">
        <MatchLineupContainer
          matchIdx={selectedIdx}
          selectedTeams={selectedTeams}
        />
      </div>
    </div>
  );
};

export default MatchListTab;
