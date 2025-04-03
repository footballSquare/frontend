import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamEmblem = (
  teamListIdx: number
): [
  putTeamEmblem: (file: File) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamEmblem = (file: File) => {
    const endPoint = `/team/${teamListIdx}/emblem`;
    const formData = new FormData();
    formData.append("file", file);
    request("PUT", endPoint, formData, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamEmblem, serverState, loading];
};

export default usePutTeamEmblem;
