import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutTeamBanner = (
  teamListIdx: number
): [
  putTeamBanner: (img: File | null) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const putTeamBanner = (img: File | null) => {
    request({ img, teamListIdx });
    console.log("팀 정보 수정", teamListIdx, img);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamBanner, serverState, loading];
};

export default usePutTeamBanner;
