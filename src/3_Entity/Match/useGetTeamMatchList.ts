import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { matchList } from "../../4_Shared/mock/matchList";
import { MatchInfo } from "./types/response";

const ITEMS_PER_PAGE = 10;

const useGetTeamMatchList = (
  page: number,
  teamIdx: number
): [MatchInfo[], boolean, boolean, () => void] => {
  const [serverState, request, loading] = useFetch();
  const [openMatchList, setOpenMatchList] = React.useState<MatchInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  const refetch = React.useCallback(() => {
    setOpenMatchList([]);
    setHasMoreContent(true);
    request(matchList);
  }, [request]);

  React.useEffect(() => {
    request(matchList);
    console.log(teamIdx);
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

  return [openMatchList, hasMoreContent, loading, refetch];
};

export default useGetTeamMatchList;
