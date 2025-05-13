import React from "react";
import useDeleteComment from "../../../../../../../3_Entity/Board/useDeleteComment";

const useCommentPutHandler = (props: UseServerStateProps): [() => void] => {
  const { board_comment_idx, handleRollbackComment, discardLastHistory } =
    props;

  const [deleteComment, deleteServerState] =
    useDeleteComment(board_comment_idx);

  React.useEffect(() => {
    if (deleteServerState) {
      switch (deleteServerState.status) {
        case 200:
          alert("댓글이 수정되었습니다.");
          discardLastHistory();
          break;
        default:
          alert("수정에 실패했습니다.");
          handleRollbackComment();
          break;
      }
    }
  }, [deleteServerState]);

  return [deleteComment];
};

export default useCommentPutHandler;
