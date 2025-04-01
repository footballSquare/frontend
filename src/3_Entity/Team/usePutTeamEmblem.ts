import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamEmblem = (
  teamListIdx: number
): [
  putTeamEmblem: (img: File) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamEmblem = (img: File) => {
    const endPoint = `/team/${teamListIdx}/emblem`;
    request("PUT", endPoint, { file: img }, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamEmblem, serverState, loading];
};

export default usePutTeamEmblem;
