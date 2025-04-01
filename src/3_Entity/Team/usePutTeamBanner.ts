import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamBanner = (
  teamListIdx: number
): [
  putTeamBanner: (img: File) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamBanner = (img: File) => {
    const endPoint = `/team/${teamListIdx}/banner`;
    request("PUT", endPoint, { file: img }, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamBanner, serverState, loading];
};

export default usePutTeamBanner;
