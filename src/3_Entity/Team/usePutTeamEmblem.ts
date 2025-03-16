import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutTeamEmblem = (
  teamListIdx: number
): [
  putTeamEmblem: (img: File | null) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const putTeamEmblem = (img: File | null) => {
    request({ img, teamListIdx });
    console.log("엠블렘 정보 수정", teamListIdx, img);
  };

  React.useEffect(() => {
    if (!serverState) return;
    if (serverState.status === 403) return;
  }, [serverState]);

  return [putTeamEmblem, serverState, loading];
};

export default usePutTeamEmblem;
