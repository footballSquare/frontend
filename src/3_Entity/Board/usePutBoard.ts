import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const usePutBoard = (
  boardListIdx: number
): [(data: PostEditFormFields) => void, Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();
  const navigate = useNavigate();

  const putBoard = (data: PostEditFormFields) => {
    const endPoint = `/board/${boardListIdx}`;
    request("PUT", endPoint, data, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200: {
        navigate(`/post/${boardListIdx}`);
        break;
      }
      default: {
        alert("게시글을 수정하는데 실패했습니다.");
        break;
      }
    }
  }, [serverState]);

  return [putBoard, serverState];
};

export default usePutBoard;
