import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const useGetBoardDetail = (board_list_idx: number): [BoardDetails, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [boardDetail, setBoardDetail] = React.useState<BoardDetails>(
    {} as BoardDetails
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (board_list_idx < 0) return;
    const endpoint = `/board/${board_list_idx}`;
    request("GET", endpoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        {
          const nestedBoard = (
            serverState as { board: { board: BoardDetails } }
          ).board.board;
          setBoardDetail(nestedBoard);
        }
        return;
      default:
        alert("게시글을 불러오는 데 실패했습니다.");
        navigate(`/404`);
    }
  }, [serverState]);

  return [boardDetail, loading];
};

export default useGetBoardDetail;
