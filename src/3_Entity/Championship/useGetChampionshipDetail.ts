import React from "react";
import { ChampionshipDetail } from "./types/response.ts";
import { useFetch } from "../../4_Shared/util/apiUtil.ts";
import { mockChampionshipDetail } from "../../4_Shared/mock/championshipInfo.ts";

const useGetChampionshipDetail = (
  championshipInfoIdx: number
): [ChampionshipDetail, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [championshipDetail, setChampionshipDetail] =
    React.useState<ChampionshipDetail>({} as ChampionshipDetail);

  React.useEffect(() => {
    request(mockChampionshipDetail);
    console.log(championshipInfoIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "championship_match" in serverState) {
      setChampionshipDetail(
        (serverState as { championship_match: ChampionshipDetail })
          .championship_match
      );
    }
  }, [loading, serverState]);

  return [championshipDetail, loading];
};

export default useGetChampionshipDetail;
