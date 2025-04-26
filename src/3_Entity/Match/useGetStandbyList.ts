import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetStandbyList = (): [StandbyPlayerInfo[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [standbyList, setStandbyList] = React.useState<StandbyPlayerInfo[]>([]);

  React.useEffect(() => {
    request("GET", `/match/stanbylist`, null, false);
  }, [request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setStandbyList(
        (serverState as { stanbylist: StandbyPlayerInfo[] }).stanbylist
      );
    }
  }, [loading, serverState]);

  return [standbyList, loading];
};

export default useGetStandbyList;
