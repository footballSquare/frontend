import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteLeaveTeam = (
  teamListIdx: number
): [deleteLeaveTeam: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetchData();

  const deleteLeaveTeam = () => {
    const endPoint = `/team/${teamListIdx}/leave`;
    request("DELETE", endPoint, null, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [deleteLeaveTeam, serverState, loading];
};

export default useDeleteLeaveTeam;
