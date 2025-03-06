import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteTeam = (
  teamListIdx: number
): [deleteEvent: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetch();

  const deleteEvent = () => {
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
  return [deleteEvent, serverState, loading];
};

export default useDeleteTeam;
