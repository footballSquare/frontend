import React from "react";
import useGetChampionshipDetail from "../../../../../../../../../3_Entity/Championship/useGetChampionshipDetail";

const useCachedChampionshipDetail = (
  selectedIdx: number
): [currentDetail: ChampionshipMatchDetail] => {
  // Cache for championship details
  const championshipDetailRef = React.useRef<
    Record<number, ChampionshipMatchDetail>
  >({});

  // State to hold the matchIdx to request
  const [requestMatchIdx, setRequestMatchIdx] = React.useState<number>(-1);

  // Update requestMatchIdx when selectedIdx changes
  React.useEffect(() => {
    if (selectedIdx !== -1 && !championshipDetailRef.current[selectedIdx]) {
      setRequestMatchIdx(selectedIdx);
    }
  }, [selectedIdx]);

  const [championshipDetail] = useGetChampionshipDetail(requestMatchIdx);

  React.useEffect(() => {
    if (requestMatchIdx !== -1 && championshipDetail) {
      championshipDetailRef.current[requestMatchIdx] = championshipDetail;
    }
  }, [championshipDetail, requestMatchIdx]);

  const currentDetail = championshipDetailRef.current[selectedIdx];

  return [currentDetail];
};

export default useCachedChampionshipDetail;
