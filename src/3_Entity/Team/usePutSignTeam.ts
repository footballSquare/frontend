import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutSignTeam = (
  teamListIdx: number
): [
  putSignTeam: () => Promise<number | undefined>,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putSignTeam = async () => {
    const endPoint = `/team/${teamListIdx}/application`;
    return await request("PUT", endPoint, null, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        alert("팀 가입 신청이 완료되었습니다. 팀 승인을 기다려주세요.");
        break;
      case 403:
        alert(serverState.message || "이미 가입한 팀이 있습니다.");
        break;
      case 400:
        alert("이미 가입 신청을 한 팀이 있습니다.");
    }
  }, [serverState]);

  return [putSignTeam, serverState, loading];
};

export default usePutSignTeam;
