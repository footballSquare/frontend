import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipEndData = (
  championshipListIdx: number
): [ChampionshipEndData, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [championshipEndData, setChampionshipEndData] =
    React.useState<ChampionshipEndData>({} as ChampionshipEndData);

  React.useEffect(() => {
    console.log(championshipListIdx);
    if (championshipListIdx <= 0) return;
    const endPoint = `/championship/${championshipListIdx}/done`;
    request("GET", endPoint, null, true);
  }, [championshipListIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      console.log(serverState);
      setChampionshipEndData(serverState as ChampionshipEndData);
    }
  }, [loading, serverState]);

  return [championshipEndData, loading];
};

export default useGetChampionshipEndData;
