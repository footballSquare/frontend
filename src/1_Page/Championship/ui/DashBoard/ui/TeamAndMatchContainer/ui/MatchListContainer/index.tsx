import React from "react";
import MatchCardBox from "./ui/MatchCardBox";
import MatchLineup from "./ui/MatchLineup";
import { getSelectedMatchTeams } from "./util/select";

const MatchListContainer = (props: MatchListContainerProps) => {
  const { matchList, filteredTeamList, handleAddMatch, handleDeleteMatch } =
    props;
  const [selectedIdx, setSelectedIdx] = React.useState<number>(0);

  React.useEffect(() => {
    if (matchList.length === 0) return;
    setSelectedIdx(matchList[0].championship_match_idx);
  }, [matchList]);

  const handleSelect = (idx: number) => setSelectedIdx(idx);

  const { selectTeamList, selectTeamScore } = getSelectedMatchTeams(
    matchList,
    selectedIdx
  );

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
      {/* 매치 결과 리스트 (좌측) */}
      <MatchCardBox
        handleAddMatch={handleAddMatch}
        handleDeleteMatch={handleDeleteMatch}
        filteredTeamList={filteredTeamList}
        matchList={matchList}
        selectedIdx={selectedIdx}
        handleSelect={handleSelect}
      />

      {/* MatchLineup (반응형 적용) */}
      <div className="flex-1 min-h-[500px] bg-gray-100 p-4 overflow-x-auto md:overflow-visible">
        <MatchLineup
          matchIdx={selectedIdx}
          selectTeamList={selectTeamList}
          selectTeamScore={selectTeamScore}
        />
      </div>
    </div>
  );
};

export default MatchListContainer;
