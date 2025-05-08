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

  const [apiData] = useGetChampionshipEndData(
    isCached ? -1 : championshipListIdx
  );

  React.useEffect(() => {
    cachedChampionshipEndDataRef.current = apiData;
  }, [apiData]);

  const finalData = isCached ? cachedChampionshipEndDataRef.current : apiData;
  return finalData;
};

export default useManageChampionshipEndData;
