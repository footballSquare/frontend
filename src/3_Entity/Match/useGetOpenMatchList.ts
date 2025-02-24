import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { matchList } from "../../4_Shared/mock/matchList";
import { MatchInfo } from "./type";

const ITEMS_PER_PAGE = 10;

const useGetOpenMatchList = (page: number): [MatchInfo[], boolean, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [openMatchList, setOpenMatchList] = React.useState<MatchInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request(matchList);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "match" in serverState) {
      setOpenMatchList((prev) => [
        ...prev,
        ...(serverState as { match: MatchInfo[] }).match,
      ]);
      setHasMoreContent(
        (serverState as { match: MatchInfo[] }).match.length >= ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [openMatchList, hasMoreContent, loading];
};

export default useGetOpenMatchList;
