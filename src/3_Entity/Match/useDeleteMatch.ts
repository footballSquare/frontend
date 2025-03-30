import { useFetchData } from "../../4_Shared/util/apiUtil";
import React from "react";
const useDeleteMatch = (): [(props: DeleteMatchProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const deleteMatch = (props: DeleteMatchProps) => {
    const { matchIdx } = props;
    request("DELETE", `/match/${matchIdx}`, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 404:
          alert("이미 삭제된 매치입니다.");
          break;
        case 429:
          alert("요청이 너무 많습니다! 잠시 기다려주세요.");
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteMatch];
};
export default useDeleteMatch;
