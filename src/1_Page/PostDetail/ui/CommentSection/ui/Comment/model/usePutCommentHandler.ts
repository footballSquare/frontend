import React from "react";
import usePutComment from "../../../../../../../3_Entity/Board/usePutComment";
import useParamInteger from "../../../../../../../4_Shared/model/useParamInteger";

const useCommentPutHandler = (
  props: UseServerStateProps
): [(content: string) => void] => {
  const { board_comment_idx, handleRollbackComment, discardLastHistory } =
    props;

  const boardListIdx = useParamInteger("postId");

  const [putComment, putServerState] = usePutComment(
    boardListIdx,
    board_comment_idx
  );
  React.useEffect(() => {
    if (putServerState) {
      switch (putServerState.status) {
        case 200:
          alert("댓글이 수정되었습니다.");
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
