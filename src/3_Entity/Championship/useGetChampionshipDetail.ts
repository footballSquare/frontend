import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipDetail = (
  championshipMatchIdx: number
): [ChampionshipMatchDetail, boolean] => {
  const [serverState, request, loading] = useFetchData();

  // 초기 state는 캐시 여부에 따라 결정
  const [championshipDetail, setChampionshipDetail] =
    React.useState<ChampionshipMatchDetail>({} as ChampionshipMatchDetail);

  React.useEffect(() => {
    if (championshipMatchIdx <= 0) return;

    const endPoint = `/championship/championship_match/${championshipMatchIdx}/detail`;
    request("GET", endPoint, null, true);
  }, [championshipMatchIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState && "championship_match" in serverState) {
      const detail = (
        serverState as { championship_match: ChampionshipMatchDetail }
      ).championship_match;
      setChampionshipDetail(detail);
    }
  }, [loading, serverState]);

  return [championshipDetail, loading];
};

export default useGetChampionshipDetail;
