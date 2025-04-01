import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteTeamPlayer = (
  teamListIdx: number
): [
  deleteTeamPlayer: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteTeamPlayer = (userIdx: number) => {
    const endPoint = `/team/${teamListIdx}/member/${userIdx}/kick`;
    request("DELETE", endPoint, null, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 403:
        return;
    }
  }, [serverState]);
  return [deleteTeamPlayer, serverState, loading];
};

export default useDeleteTeamPlayer;
