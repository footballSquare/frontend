import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteTeam = (
  teamListIdx: number
): [deleteTeam: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetch();

  const deleteTeam = () => {
    request({ teamListIdx });
    console.log("삭제된 데이터:", teamListIdx);
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
