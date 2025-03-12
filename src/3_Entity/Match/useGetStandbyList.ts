import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { waitingPlayerList } from "../../4_Shared/mock/waitingPlayerList";
import { StandbyPlayerInfo } from "./types/response";

const ITEMS_PER_PAGE = 10;

const useGetStandbyList = (page: number): [StandbyPlayerInfo[], boolean, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [standbyList, setStandbyList] = React.useState<StandbyPlayerInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request(waitingPlayerList);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState && "access_list" in serverState) {
      setStandbyList((prev) => [
        ...prev,
        ...(serverState as { access_list: StandbyPlayerInfo[] }).access_list,
      ]);
      setHasMoreContent(
        (serverState as { access_list: StandbyPlayerInfo[] }).access_list.length >= ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [standbyList, hasMoreContent, loading];
};

export default useGetStandbyList;
