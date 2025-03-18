import React from "react";
import { useGetChmpinshipMatchListProps } from "./types/request";
import { ChampionshipMatchList } from "./types/response";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockChampionshipMatchList } from "../../4_Shared/mock/championshipInfo";

const ITEMS_PER_PAGE = 5;

const useGetChampionshipMatchList = (
  props: useGetChmpinshipMatchListProps
): [ChampionshipMatchList[], boolean, boolean] => {
  const { category, page } = props;
  const [serverState, request, loading] = useFetch();
  const [matchList, setMatchList] = React.useState<ChampionshipMatchList[]>(
    mockChampionshipMatchList.championship_match
  );
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(false);

  React.useEffect(() => {
    request(mockChampionshipMatchList);
  }, [category, page]);

  React.useEffect(() => {
    if (!loading && serverState) {
      if (
        serverState &&
        "championship_match" in serverState &&
        Array.isArray(serverState.championship_match)
      ) {
        setMatchList(serverState.championship_match);
        setHasMoreContent(
          serverState.championship_match.length >= ITEMS_PER_PAGE
        );
      } else {
        console.error("serverState is not in expected format:", serverState);
      }
    }
  }, [loading, serverState]);

  return [matchList, hasMoreContent, loading];
};

export default useGetChampionshipMatchList;
