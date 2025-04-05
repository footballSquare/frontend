import React from "react";

const useSelectHandler = (
  matchList: ChampionshipMatchList[]
): [number, (idx: number) => void] => {
  const [selectedIdx, setSelectedIdx] = React.useState<number>(0);

  React.useEffect(() => {
    if (matchList.length === 0) return;
    setSelectedIdx(matchList[0].championship_match_idx);
  }, [matchList]);

  const handleSelect = (idx: number) => setSelectedIdx(idx);

  return [selectedIdx, handleSelect];
};

export default useSelectHandler;
