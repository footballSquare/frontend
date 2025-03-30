import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutChampionshipEnd = (
  championshipListIdx: number
): [() => void, Record<string, unknown> | null] => {
  const [serverState, request, loading] = useFetchData();

  const putChampionshipEnd = () => {
    const endPoint = `/championship/${championshipListIdx}/done`;
    request("PUT", endPoint, null, true);
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

  return [putChampionshipEnd, serverState];
};
export default usePutChampionshipEnd;
