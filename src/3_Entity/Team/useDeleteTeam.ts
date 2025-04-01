import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteTeam = (
  teamListIdx: number
): [deleteTeam: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetchData();

  const deleteTeam = () => {
    const endPoint = `/team/${teamListIdx}`;
    request("DELETE", endPoint, null, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 403:
        return;
    }
  }, [serverState]);
  return [deleteTeam, serverState, loading];
};

export default useDeleteTeam;
