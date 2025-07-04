import React from "react";
import usePostComment from "../../../../../3_Entity/Board/usePostComment";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";

const usePostCommentHandler = (
  handleSetCommentsIdx: (newIdx: number) => void
): UsePostCommentHandlerReturn => {
  const boardListIdx = useParamInteger("postId");

  const [postComment, postServerState] = usePostComment(boardListIdx);

  React.useEffect(() => {
    if (postServerState) {
      switch (postServerState.status) {
        case 200: {
          const { board_comment_idx } = postServerState as {
            board_comment_idx: number;
          };
          handleSetCommentsIdx(board_comment_idx);
          break;
        }
        default:
          alert("작성에 실패했습니다.");
          break;
      }
    }
  }, [postServerState]);

  return [postComment];
};
export default usePostCommentHandler;
