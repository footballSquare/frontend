import React from "react";
import MatchCardBox from "./ui/MatchCardBox";
import MatchLineup from "./ui/MatchLineup";
import { getSelectedMatchTeams } from "./ui/MatchLineup/util/select";

const MatchListContainer = (props: MatchListContainerProps) => {
  const { matchList, teamList, refetch } = props;
  const [selectedIdx, setSelectedIdx] = React.useState<number>(
    matchList[0].championship_match_idx
  );
  const handleSelect = (idx: number) => setSelectedIdx(idx);

  const { selectTeamList, selectTeamScore } = getSelectedMatchTeams(
    matchList,
    selectedIdx
  );

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
      {/* 매치 결과 리스트 (좌측) */}
      <MatchCardBox
        teamList={teamList}
        matchList={matchList}
        selectedIdx={selectedIdx}
        handleSelect={handleSelect}
        refetch={refetch}
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
