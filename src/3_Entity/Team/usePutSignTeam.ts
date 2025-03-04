import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutSignTeam = (
  teamListIdx: number
): [putEvent: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetch();

  const putEvent = () => {
    request({ teamListIdx });
    console.log("팀 가입신청", teamListIdx);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putEvent, serverState, loading];
};

export default usePutSignTeam;
