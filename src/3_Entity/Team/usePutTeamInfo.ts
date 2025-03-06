import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { TeamPutInfo } from "./type";

const usePutTeamInfo = (
  teamListIdx: number
): [
  putEvent: (data: TeamPutInfo) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const putEvent = (data: TeamPutInfo) => {
    request({ data, teamListIdx });
    console.log("팀 정보 수정", teamListIdx, data);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putEvent, serverState, loading];
};

export default usePutTeamInfo;
