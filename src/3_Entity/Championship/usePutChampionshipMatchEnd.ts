import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutChampionshipMatchEnd = (): [
  (championshipMatchIdx: number) => void,
  Record<string, unknown> | null
] => {
  const [serverState, request, loading] = useFetch();

  const putChampionshipMatchEnd = (championshipMatchIdx: number) => {
    request({
      data: `deleteMatchApproval of ${championshipMatchIdx}`,
    });
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 403:
          console.log(serverState.message);
          break;
        case 429:
          alert("요청이 너무 많습니다! 잠시 기다려주세요.");
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [putChampionshipMatchEnd, serverState];
};
export default usePutChampionshipMatchEnd;
