const useManageComments = () => {
  const [comments, setComments] =
    React.useState<BoardComment[]>(initialComments);

  const [myIdx] = useMyUserIdx();
  const [myNickname] = useMyNickname();

  /* 댓글 추가 */
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    if (!myIdx || !myNickname) {
      alert("로그인 후 댓글을 작성해주세요.");
      return;
    }

    const newId = Math.max(0, ...comments.map((c) => c.board_comment_idx)) + 1;
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");

    const newCommentObj: BoardComment = {
      player_list_idx: myIdx,
      board_comment_idx: newId,
      player_list_nickname: myNickname,
      board_comment_content: newComment,
      board_comment_created_at: now,
      board_comment_updated_at: now,
      player_list_profile_image: null,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  /* 댓글 수정 */
  const handleEditComment = (id: number, body: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.board_comment_idx === id ? { ...c, board_comment_content: body } : c
      )
    );
    setEditingId(null);
    setCommentInput("");
  };

  /* 댓글 삭제 */
  const handleDeleteComment = (id: number) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?"))
      setComments((prev) => prev.filter((c) => c.board_comment_idx !== id));
  };
  return {
    comments,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
  };
};
