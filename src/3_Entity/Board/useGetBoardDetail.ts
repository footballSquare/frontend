import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetBoardDetail = (board_list_idx: number): [BoardDetails, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [boardDetail, setBoardDetail] = React.useState<BoardDetails>(
    {} as BoardDetails
  );

  React.useEffect(() => {
    const endpoint = `/board/${board_list_idx}`;
    request("GET", endpoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "board" in serverState) {
      const nestedBoard = (serverState as { board: { board: BoardDetails } })
        .board.board;
      setBoardDetail(nestedBoard);
    }
  }, [loading, serverState]);

  return [boardDetail, loading];
};

export default useGetBoardDetail;
