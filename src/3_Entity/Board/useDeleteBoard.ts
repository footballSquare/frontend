import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const useDeleteBoard = (boardListIdx: number): [() => void] => {
  const [serverState, request, loading] = useFetchData();

  const deleteBoard = () => {
    request("DELETE", `/board/${boardListIdx}`, null, true);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("게시글 삭제가 완료되었습니다");
          navigate(-1);
          break;
        default:
          alert("삭제가 실패했습니다. (서버 애러)");
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteBoard];
};

export default useDeleteBoard;
