import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const usePostBoard = (): [
  (data: PostEditFormFields, category: number) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();
  const navigate = useNavigate();

  const postBoard = (data: PostEditFormFields, category: number) => {
    const endPoint = `/board/?category=${category}`;
    request("POST", endPoint, data, true);
  };

  React.useEffect(() => {
    if (!serverState) return;

    switch (serverState.status) {
      case 200: {
        const { board_list_idx } = serverState.data as {
          board_list_idx: number;
        };
        navigate(`/post/${board_list_idx}`);
        break;
      }
      case 403: {
        alert("게시글 작성 권한이 없습니다.");
        break;
      }
      default: {
        alert("게시글을 작성하는 데 실패했습니다.");
        break;
      }
    }
  }, [serverState, navigate]);

  return [postBoard, serverState];
};

export default usePostBoard;
