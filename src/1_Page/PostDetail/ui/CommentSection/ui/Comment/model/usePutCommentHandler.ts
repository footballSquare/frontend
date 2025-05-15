import React from "react";
import usePutComment from "../../../../../../../3_Entity/Board/usePutComment";

const useCommentPutHandler = (
  props: UseServerStateProps
): [(content: string) => void] => {
  const { board_comment_idx, handleRollbackComment, discardLastHistory } =
    props;

  const [putComment, putServerState] = usePutComment(board_comment_idx);
  React.useEffect(() => {
    if (putServerState) {
      switch (putServerState.status) {
        case 200:
          discardLastHistory();
          break;
        default:
          alert("수정에 실패했습니다.");
          handleRollbackComment();
      }
    }
  }, [putServerState]);

  return [putComment];
};

export default useCommentPutHandler;
