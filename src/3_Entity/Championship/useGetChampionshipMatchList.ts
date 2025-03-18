import React from "react";
import { ChampionshipMatchList } from "./types/response";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockChampionshipMatchList } from "../../4_Shared/mock/championshipInfo";

const useGetChampionshipMatchList = (
  championshipListIdx: number
): [ChampionshipMatchList[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [matchList, setMatchList] = React.useState<ChampionshipMatchList[]>(
    mockChampionshipMatchList.championship_match
  );

  React.useEffect(() => {
    request(mockChampionshipMatchList);
    console.log(championshipListIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState) {
      if (
        serverState &&
        "championship_match" in serverState &&
        Array.isArray(serverState.championship_match)
      ) {
        setMatchList(serverState.championship_match);
      } else {
        console.error("serverState is not in expected format:", serverState);
      }
    }
  }, [loading, serverState]);

  return [matchList, loading];
};

export default useGetChampionshipMatchList;
