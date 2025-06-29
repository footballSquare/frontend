type UseManageCommentsReturn = {
  comments: BoardComment[];
  handleAddComment: (data: { content: string }) => void;
  handleEditComment: (id: number, body: string) => void;
  handleDeleteComment: (id: number) => void;
  handleRollbackComment: () => void;
  discardLastHistory: () => void;
  handleSetCommentsIdx: (newId: number) => void;
};
type UsePostCommentHandlerReturn = [postComment: (postText: string) => void];
