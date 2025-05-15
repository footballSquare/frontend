type CommentProps = {
  comment: BoardComment;
  handleEditComment: (commentId: number, content: string) => void;
  handleDeleteComment: (commentId: number) => void;
  handleRollbackComment: () => void;
  discardLastHistory: () => void;
};
