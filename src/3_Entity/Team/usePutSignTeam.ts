import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutSignTeam = (
  teamListIdx: number
): [putSignTeam: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetchData();

  const putSignTeam = () => {
    const endPoint = `/team/${teamListIdx}/application`;
    request("PUT", endPoint, null, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putSignTeam, serverState, loading];
};

export default usePutSignTeam;
