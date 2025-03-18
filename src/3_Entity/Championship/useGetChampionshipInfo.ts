import React from "react";
import { ChampionshipInfo } from "./types/response";
import { useFetch } from "../../4_Shared/util/apiUtil.ts";
import { mockChampionshipInfo } from "../../4_Shared/mock/championshipInfo.ts";

const useGetChampionshipInfo = (
  championshipInfoIdx: number
): [ChampionshipInfo, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [championshipInfo, setChampionshipInfo] =
    React.useState<ChampionshipInfo>({} as ChampionshipInfo);

  React.useEffect(() => {
    request(mockChampionshipInfo);
    console.log(championshipInfoIdx);
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
