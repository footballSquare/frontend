import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutTeamBanner = (
  teamListIdx: number
): [
  putEvent: (data: File | null) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const putEvent = (data: File | null) => {
    request({ data, teamListIdx });
    console.log("팀 정보 수정", teamListIdx, data);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putEvent, serverState, loading];
};

export default usePutTeamBanner;
