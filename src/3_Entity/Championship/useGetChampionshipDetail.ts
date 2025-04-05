import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipDetail = (
  championshipMatchIdx: number
): [ChampionshipDetail, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [championshipDetail, setChampionshipDetail] =
    React.useState<ChampionshipDetail>({} as ChampionshipDetail);

  React.useEffect(() => {
    const endPoint =
      import.meta.env.VITE_SERVER_URL +
      `/championship/championship_match/${championshipMatchIdx}/detail`;
    request("GET", endPoint, null, true);
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
