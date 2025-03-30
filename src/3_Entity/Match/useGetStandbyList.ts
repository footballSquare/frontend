import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 10;

const useGetStandbyList = (props: UseGetStandbyListProps): [StandbyPlayerInfo[], boolean, boolean] => {
  const { page } = props;
  const [serverState, request, loading] = useFetchData();
  const [standbyList, setStandbyList] = React.useState<StandbyPlayerInfo[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);

  React.useEffect(() => {
    request("GET", `/match/standbylist?page=${page}`, null, false);
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
