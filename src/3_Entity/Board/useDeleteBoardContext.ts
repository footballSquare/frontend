import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteBoardContext = (boardListIdx: number): [() => void] => {
  const [serverState, request, loading] = useFetchData();

  const deleteBoardContext = () => {
    request("DELETE", `/board/${boardListIdx}`, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("게시글 삭제가 완료되었습니다");
          break;
        default:
          alert("삭제가 실패했습니다. (서버 애러)");
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteBoardContext];
};

export default useDeleteBoardContext;
