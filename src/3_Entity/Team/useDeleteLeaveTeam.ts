import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteLeaveTeam = (
  teamListIdx: number
): [deleteLeaveTeam: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetch();

  const deleteLeaveTeam = () => {
    request({ teamListIdx });
    console.log("팀 탈퇴 실행", teamListIdx);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [deleteLeaveTeam, serverState, loading];
};

export default useDeleteLeaveTeam;
