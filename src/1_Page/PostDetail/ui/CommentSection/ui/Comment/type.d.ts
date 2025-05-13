type CommentProps = {
  comment: BoardComment;
  board_list_idx: number;
  handleEditComment: (commentId: number, content: string) => void;
  handleDeleteComment: (commentId: number) => void;
};
