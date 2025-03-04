import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteTeamPlayer = (): [
  deleteEvent: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const deleteEvent = (userIdx: number) => {
    request({ userIdx });
    console.log("삭제된 데이터:", userIdx);
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

export default useDeleteTeamPlayer;
