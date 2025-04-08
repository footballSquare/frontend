import React from "react";
import { getSelectedMatchTeams } from "../util/getSelectedMatchTeams";

const useSelectHandler = (
  matchList: ChampionshipMatchList[]
): [number, SelectTeamMatchInfo, (idx: number) => void] => {
  const [selectedIdx, setSelectedIdx] = React.useState<number>(0);

  React.useEffect(() => {
    if (matchList.length === 0) return;
    setSelectedIdx(matchList[0].championship_match_idx);
  }, [matchList]);

  const handleSelect = (idx: number) => setSelectedIdx(idx);

  const selectedTeams = React.useMemo(
    () => getSelectedMatchTeams(matchList, selectedIdx),
    [matchList, selectedIdx]
  );

  return [selectedIdx, selectedTeams, handleSelect];
};

export default useSelectHandler;
