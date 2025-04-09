import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutChampionshipEnd = (
  championshipListIdx: number
): [
  (putData: UsePutChampionshipEndProps) => void,
  Record<string, unknown> | null
] => {
  const [serverState, request, loading] = useFetchData();

  const putChampionshipEnd = (
    putChampionshipEndData: UsePutChampionshipEndProps
  ) => {
    const endPoint = `/championship/${championshipListIdx}/done`;
    request("PUT", endPoint, putChampionshipEndData, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 403:
          alert("대회 매치에 포함된 모든 매치가 마감되지 않았습니다.");
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
