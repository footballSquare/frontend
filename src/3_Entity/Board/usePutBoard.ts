import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const usePutBoard = (
  boardListIdx: number
): [(data: UsePutBoardProps) => void, Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();
  const navigate = useNavigate();

  const putBoard = (props: UsePutBoardProps) => {
    const { formData } = props;
    const endPoint = `/board/${boardListIdx}`;
    request("PUT", endPoint, formData, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200: {
        navigate(`/post/${boardListIdx}`);
        break;
      }

      default: {
        alert(serverState.message || "게시글 작성에 실패했습니다.");
        break;
      }
    }
  }, [serverState]);

  return [putBoard, serverState];
};

export default usePutBoard;
