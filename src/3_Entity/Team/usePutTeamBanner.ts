import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamBanner = (
  teamListIdx: number
): [
  putTeamBanner: (file: File) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamBanner = (file: File) => {
    const endPoint = `/team/${teamListIdx}/banner`;
    const formData = new FormData();
    formData.append("file", file);
    request("PUT", endPoint, formData, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamBanner, serverState, loading];
};

export default usePutTeamBanner;
