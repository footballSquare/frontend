import React from "react";

const useSelectHandler = (
  matchList: ChampionshipMatchList[]
): UseSelectHandlerReturn => {
  const [selectChampionshipMatchIdx, setSelectChampionshipMatchIdx] =
    React.useState<number | null>(null);

  const selectedMatch = matchList.find(
    (matchData) =>
      matchData.championship_match_idx === selectChampionshipMatchIdx
  );

  // 매치 선택 및 상세 보기로 전환하는 핸들러
  const handleMatchSelect = React.useCallback(
    (championshipMatchIdx: number) => {
      setSelectChampionshipMatchIdx(championshipMatchIdx);
    },
    []
  );

  // 매치 리스트로 돌아가는 핸들러
  const handleBackToList = React.useCallback(() => {
    setSelectChampionshipMatchIdx(null);
  }, []);

  return {
    selectChampionshipMatchIdx,
    selectedMatch,
    handleMatchSelect,
    handleBackToList,
  };
};

export default useSelectHandler;
