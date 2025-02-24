import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { matchList } from "../../4_Shared/mock/matchList";
import { MatchInfo } from "./type";

const ITEMS_PER_PAGE = 10;

const useGetOpenMatchList = (page: number) => {
  const [serverState, request, loading] = useFetch();
  const [openMatchList, setOpenMatchList] = React.useState<MatchInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    console.log(page, "request")
    console.log(matchList)
    request(matchList);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState) {
      console.log("추가 로딩")
      setOpenMatchList((prev)=>[...prev, ...serverState.match]);
      setHasMoreContent(
        (serverState.match || []).length >= ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return {openMatchList, hasMoreContent, loading};
}

export default useGetOpenMatchList;