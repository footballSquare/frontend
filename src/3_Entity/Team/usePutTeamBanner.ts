import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamBanner = (
  teamListIdx: number
): [
  putTeamBanner: (file: File) => Promise<number | undefined>,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamBanner = async (file: File) => {
    const endPoint = `/team/${teamListIdx}/banner`;
    const formData = new FormData();
    formData.append("file", file);
    return await request("PUT", endPoint, formData, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 403:
        alert("팀원 수 부족: 최소 10명 필요 (현재 1명)");
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  }, [serverState]);

  return [putTeamBanner, serverState, loading];
};

export default usePutTeamBanner;
