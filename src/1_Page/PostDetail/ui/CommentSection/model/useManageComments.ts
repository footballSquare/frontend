import React from "react";
import {
  useMyNickname,
  useMyProfileImg,
  useMyUserIdx,
} from "../../../../../4_Shared/lib/useMyInfo";

const useManageComments = (initialComments: BoardComment[]) => {
  const [myIdx] = useMyUserIdx();
  const [myNickname] = useMyNickname();
  const [myProfileImage] = useMyProfileImg();

  const [comments, setComments] = React.useState<BoardComment[]>(
    [] as BoardComment[]
  );

  React.useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const commentsHistoryRef = React.useRef<BoardComment[][]>([]);
  const commentNewRef = React.useRef<number[]>([]);

  const handleAddComment = (data: { content: string }) => {
    const text = data.content.trim();
    if (!myIdx || !myNickname) {
      alert("로그인 후 댓글을 작성해주세요.");
      return;
    }
    const newId = Math.max(0, ...comments.map((c) => c.board_comment_idx)) + 1;
    commentNewRef.current.push(newId);

    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setComments([
      ...comments,
      {
        player_list_idx: myIdx,
        board_comment_idx: newId,
        player_list_nickname: myNickname,
        board_comment_content: text,
        board_comment_created_at: now,
        board_comment_updated_at: now,
        player_list_profile_image: myProfileImage,
      },
    ]);
  };

  /* 댓글 수정 */
  const handleEditComment = (id: number, body: string) => {
    setComments((prev) => {
      commentsHistoryRef.current.push(prev);
      return prev.map((c) =>
        c.board_comment_idx === id ? { ...c, board_comment_content: body } : c
      );
    });
  };

  /* 댓글 삭제 */
  const handleDeleteComment = (id: number) => {
    setComments((prev) => {
      commentsHistoryRef.current.push(prev);
      return prev.filter((c) => c.board_comment_idx !== id);
    });
  };

  const handleRollbackComment = () => {
    const history = commentsHistoryRef.current;
    if (history.length === 0) return;
    const previous = history.pop();
    if (previous) {
      setComments(previous);
    }
  };

  const discardLastHistory = () => {
    const history = commentsHistoryRef.current;
    if (history.length === 0) return;
    history.pop();
  };

  const handleSetCommentsIdx = (newId: number) => {
    setComments((prev) => {
      return prev.map((comment) =>
        comment.board_comment_idx === commentNewRef.current[0]
          ? { ...comment, board_comment_idx: newId }
          : comment
      );
    });
    commentNewRef.current.pop();
  };

  return {
    comments,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    handleRollbackComment,
    discardLastHistory,
    handleSetCommentsIdx,
  };
};

export default useManageComments;
