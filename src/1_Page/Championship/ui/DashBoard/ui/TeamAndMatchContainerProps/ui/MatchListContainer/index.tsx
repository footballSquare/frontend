import React from "react";
import MatchCardBox from "./ui/MatchCardBox";
import MatchLineup from "./ui/MatchLineup";
import { getSelectedMatchTeams } from "./ui/MatchLineup/util/select";

const MatchListContainer = (props: MatchListContainerProps) => {
  const { matchList } = props;
  const [selectedIdx, setSelectedIdx] = React.useState<number>(-1);
  const handleSelect = (idx: number) => setSelectedIdx(idx);

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
      {/* 매치 결과 리스트 (좌측) */}
      <MatchCardBox
        matchList={matchList}
        selectedIdx={selectedIdx}
        handleSelect={handleSelect}
      />

      {/* MatchLineup (반응형 적용) */}
      <div className="flex-1 min-h-[500px] bg-gray-100 p-4 overflow-x-auto md:overflow-visible">
        <MatchLineup
          matchIdx={selectedIdx}
          selectTeamList={getSelectedMatchTeams(matchList, selectedIdx)}
        />
      </div>
    </div>
  );
};

export default MatchListContainer;
