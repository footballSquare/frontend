import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteChampionshipMatch = (): [
  (championshipMatchIdx: number) => void,
  Record<string, unknown> | null
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteChampionshipMatch = (championshipMatchIdx: number) => {
    const endPoint = `/championship/championship_match/${championshipMatchIdx}`;
    request("DELETE", endPoint, null, true);
  };
  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("삭제되었습니다.");
          break;
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

  return [deleteChampionshipMatch, serverState];
};
export default useDeleteChampionshipMatch;
