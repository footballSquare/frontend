import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockChampionshipMatchTor } from "../../4_Shared/mock/championshipMatchList";

const useGetChampionshipMatchList = (
  championshipListIdx: number
): [ChampionshipMatchList[], boolean, () => void] => {
  const [serverState, request, loading] = useFetch();
  const [matchList, setMatchList] = React.useState<ChampionshipMatchList[]>(
    mockChampionshipMatchTor.championship_match
  );

  React.useEffect(() => {
    request(mockChampionshipMatchTor);
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

  const refetch = () => {
    request(mockChampionshipMatchTor);
  };

  return [matchList, loading, refetch];
};

export default useGetChampionshipMatchList;
