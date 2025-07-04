import React from "react";

const useSelectHandler = (
  matchList: ChampionshipMatchList[]
): UseSelectHandlerReturn => {
  const [selectChampionshipMatchIdx, setSelectedIdx] =
    React.useState<number>(0);
  const [isMatchDetailView, setIsMatchDetailView] = React.useState(false); // 매치 상세 보기 상태

  const selectedMatch = matchList.find(
    (matchData) =>
      matchData.championship_match_idx === selectChampionshipMatchIdx
  );

  // 매치 선택 및 상세 보기로 전환하는 핸들러
  const handleMatchSelect = React.useCallback(
    (championshipMatchIdx: number) => {
      setSelectedIdx(championshipMatchIdx);
      setIsMatchDetailView(true);
    },
    [setSelectedIdx]
  );

  // 매치 리스트로 돌아가는 핸들러
  const handleBackToList = React.useCallback(() => {
    setIsMatchDetailView(false);
  }, []);

  return {
    selectChampionshipMatchIdx,
    selectedMatch,
    isMatchDetailView,
    handleMatchSelect,
    handleBackToList,
  };
};

export default useSelectHandler;
