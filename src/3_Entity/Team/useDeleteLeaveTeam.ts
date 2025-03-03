import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteLeaveTeam = (
  teamListIdx: number
): [deleteEvent: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetch();

  const deleteEvent = () => {
    request({ teamListIdx });
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [deleteEvent, serverState, loading];
};

export default useDeleteLeaveTeam;
