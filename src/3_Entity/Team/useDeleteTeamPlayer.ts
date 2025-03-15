import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteTeamPlayer = (
  teamListIdx: number
): [
  deleteTeamPlayer: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const deleteTeamPlayer = (userIdx: number) => {
    request({ userIdx });
    console.log("삭제된 데이터:", userIdx, teamListIdx);
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
