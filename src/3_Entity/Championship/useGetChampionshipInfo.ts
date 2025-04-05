import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipInfo = (
  championshipListIdx: number
): [ChampionshipInfo, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [championshipInfo, setChampionshipInfo] =
    React.useState<ChampionshipInfo>({} as ChampionshipInfo);

  React.useEffect(() => {
    const endPoint = `/championship/${championshipListIdx}`;
    request("GET", endPoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "championship_data" in serverState) {
      setChampionshipInfo(
        (serverState as { championship_data: ChampionshipInfo })
          .championship_data
      );
    }
  }, [loading, serverState]);

  return [championshipInfo, loading];
};

export default useGetChampionshipInfo;
