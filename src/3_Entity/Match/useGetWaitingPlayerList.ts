import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { waitingPlayerList } from "../../4_Shared/mock/waitingPlayerList";
import { WaitingPlayerInfo } from "./type";

const ITEMS_PER_PAGE = 10;

const useGetOpenMatchList = (page: number): [WaitingPlayerInfo[], boolean, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [openMatchList, setOpenMatchList] = React.useState<WaitingPlayerInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request(waitingPlayerList);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "access_list" in serverState) {
      setOpenMatchList((prev) => [
        ...prev,
        ...(serverState as { access_list: WaitingPlayerInfo[] }).access_list,
      ]);
      setHasMoreContent(
        (serverState as { access_list: WaitingPlayerInfo[] }).access_list.length >= ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [openMatchList, hasMoreContent, loading];
};

export default useGetOpenMatchList;
