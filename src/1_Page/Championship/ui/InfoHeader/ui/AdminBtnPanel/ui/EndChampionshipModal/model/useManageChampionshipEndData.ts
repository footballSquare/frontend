import React from "react";
import useGetChampionshipEndData from "../../../../../../../../../3_Entity/Championship/useGetChampionshipEndData";

const useManageChampionshipEndData = (
  championshipListIdx: number,
  cachedChampionshipEndDataRef: React.MutableRefObject<ChampionshipEndData>
): ChampionshipEndData => {
  const isCached = !!(
    cachedChampionshipEndDataRef.current &&
    Object.keys(cachedChampionshipEndDataRef.current).length > 0
  );
  console.log(isCached);
  const realListIdx = isCached ? -1 : championshipListIdx;

  const [apiData] = useGetChampionshipEndData(realListIdx);

  React.useEffect(() => {
    cachedChampionshipEndDataRef.current = apiData;
  }, [apiData]);

  const finalData = isCached ? cachedChampionshipEndDataRef.current : apiData;
  return finalData;
};

export default useManageChampionshipEndData;
