import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 10;

const useGetOpenMatchList = (
  props: UseGetOpenMatchListProps
): [MatchInfo[], boolean, boolean] => {
  const { page } = props;
  const [serverState, request, loading] = useFetchData();
  const [openMatchList, setOpenMatchList] = React.useState<MatchInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request("GET", `/match/open?page=${page}`, null, false);
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
