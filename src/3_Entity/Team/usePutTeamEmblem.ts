import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutTeamEmblem = (
  teamListIdx: number
): [
  putTeamEmblem: (file: File) => Promise<number | undefined>,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putTeamEmblem = async (file: File) => {
    const endPoint = `/team/${teamListIdx}/emblem`;
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

  return [putTeamEmblem, serverState, loading];
};

export default usePutTeamEmblem;
