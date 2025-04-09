import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetChampionshipMatchList = (
  championshipListIdx: number
): [ChampionshipMatchList[], () => void, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [matchList, setMatchList] = React.useState<ChampionshipMatchList[]>([]);

  const fetchMatchList = React.useCallback(() => {
    const endPoint = `/championship/${championshipListIdx}/championship_match`;
    request("GET", endPoint, null, true);
  }, [championshipListIdx, request]);

  React.useEffect(() => {
    fetchMatchList();
  }, [fetchMatchList]);

  React.useEffect(() => {
    if (!loading && serverState) {
      if (
        "championship_match" in serverState &&
        Array.isArray(serverState.championship_match)
      ) {
        setMatchList(serverState.championship_match);
      } else {
        console.error("serverState is not in expected format:", serverState);
      }
    }
  }, [loading, serverState]);

  return [matchList, fetchMatchList, loading];
};
export default useGetChampionshipMatchList;
