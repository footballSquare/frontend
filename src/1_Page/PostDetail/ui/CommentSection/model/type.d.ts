type UseManageCommentsProps = {
  initialComments: BoardComment[];
};

type UseCommentPutHandlerProps = {
  board_list_idx: number;
  board_comment_idx: number;
  handleRollbackComment: () => void;
  discardLastHistory: () => void;
};
