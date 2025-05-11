import React from "react";
import { useNavigate } from "react-router-dom";
import useGetBoardDetail from "../../3_Entity/Board/useGetBoardDetail";
import useParamInteger from "../../4_Shared/model/useParamInteger";
import { useMyNickname, useMyUserIdx } from "../../4_Shared/lib/useMyInfo";

const PostDetail = () => {
  const navigate = useNavigate();

  const postId = useParamInteger("postId");
  const [board] = useGetBoardDetail(postId);

  const {
    board_category_idx,
    board_list_created_at,
    board_list_title,
    board_list_content,
    board_list_img,
    board_list_idx,
    player,
  } = board;

  const player_list_profile_image = player?.player_list_profile_image ?? null;
  const player_list_nickname = player?.player_list_nickname ?? "";
  const firstImage = board_list_img?.[0];

  const [comments, setComments] = React.useState<BoardComment[]>([]);

  React.useEffect(() => {
    setComments(board.comments || []);
  }, [board]);

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [commentInput, setCommentInput] = React.useState("");
  const [newComment, setNewComment] = React.useState("");

  const handleDeletePost = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      navigate(-1);
    }
  };

  const handleEditComment = (id: number, body: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.board_comment_idx === id ? { ...c, board_comment_content: body } : c
      )
    );
    setEditingId(null);
    setCommentInput("");
  };

  const [myIdx] = useMyUserIdx();
  const [myNickname] = useMyNickname();

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newId = Math.max(0, ...comments.map((c) => c.board_comment_idx)) + 1;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    if (!myIdx || !myNickname) {
      alert("로그인 후 댓글을 작성해주세요.");
      return;
    }
    const newCommentObj: BoardComment = {
      player_list_idx: myIdx,
      board_comment_idx: newId,
      player_list_nickname: myNickname,
      board_comment_content: newComment,
      board_comment_created_at: formattedDate,
      board_comment_updated_at: formattedDate,
      player_list_profile_image: null,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-[#e1e4ea] px-4 sm:px-6">
      {/* 게시글 헤더 */}
      <div className="space-y-3 border-b border-[#262b40] pb-6">
        <div className="flex justify-between items-center">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            {board_category_idx === 1 ? "공지" : "자유"}
          </span>
          <p className="text-sm text-gray-400">{board_list_created_at}</p>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 break-words">
          {board_list_title}
        </h1>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#262b40] overflow-hidden flex items-center justify-center text-gray-300">
            {player_list_profile_image ? (
              <img
                src={player_list_profile_image}
                alt={player_list_nickname}
                className="w-full h-full object-cover"
              />
            ) : (
              player_list_nickname.charAt(0)
            )}
          </div>
          <p className="text-gray-300">{player_list_nickname}</p>
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="space-y-6">
        <p className="whitespace-pre-wrap leading-relaxed text-gray-300 min-h-[200px] break-words">
          {board_list_content}
        </p>

        {firstImage && (
          <div className="p-2 bg-[#1b1f2e] border border-[#262b40] rounded">
            <img
              src={firstImage}
              alt="게시글 이미지"
              className="w-full max-w-full max-h-96 mx-auto rounded"
            />
          </div>
        )}
      </div>

      {/* 게시글 작업 버튼 */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          className="text-[#2f80ed] hover:underline cursor-pointer"
          onClick={() => navigate(`/board/edit/${board_list_idx}`)}>
          수정
        </button>
        <button
          className="text-[#ff5353] hover:underline cursor-pointer"
          onClick={handleDeletePost}>
          삭제
        </button>
        <button
          className="text-[#c9ced8] hover:underline cursor-pointer ml-auto"
          onClick={() => navigate(-1)}>
          목록
        </button>
      </div>

      {/* 댓글 작성 */}
      <div className="pt-6 border-t border-[#262b40]">
        <h3 className="text-lg font-medium mb-4 text-gray-200">
          댓글 {comments.length}개
        </h3>

        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요..."
            className="w-full bg-[#262b40] border border-[#262b40] rounded p-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className={`px-4 py-2 rounded ${
                newComment.trim()
                  ? "bg-[#2f80ed] hover:bg-[#1f6fe5] text-white"
                  : "bg-[#2a2e3d] text-gray-400 cursor-not-allowed"
              }`}>
              댓글 작성
            </button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <section className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              첫 댓글을 작성해보세요!
            </p>
          ) : (
            comments.slice(0, 40).map((comment, index) => (
              <div
                key={comment.board_comment_idx + index}
                className="p-4 border-b border-[#262b40]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#262b40] overflow-hidden flex items-center justify-center text-gray-300">
                      {comment.player_list_profile_image ? (
                        <img
                          src={comment.player_list_profile_image}
                          alt={comment.player_list_nickname}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        comment.player_list_nickname.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-300">
                        {comment.player_list_nickname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {comment.board_comment_created_at}
                      </p>
                    </div>
                  </div>
                </div>

                {editingId === comment.board_comment_idx ? (
                  <div className="space-y-3 mt-3">
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="w-full bg-transparent border border-[#262b40] p-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex space-x-2 justify-end">
                      <button
                        className="text-[#2f80ed] hover:underline cursor-pointer"
                        onClick={() =>
                          handleEditComment(
                            comment.board_comment_idx,
                            commentInput
                          )
                        }>
                        수정 완료
                      </button>
                      <button
                        className="text-[#c9ced8] hover:underline cursor-pointer"
                        onClick={() => {
                          setEditingId(null);
                          setCommentInput("");
                        }}>
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="whitespace-pre-wrap text-gray-300">
                      {comment.board_comment_content}
                    </p>
                    <div className="flex space-x-2 mt-3 justify-end">
                      <button
                        className="text-[#c9ced8] hover:underline cursor-pointer"
                        onClick={() => {
                          setEditingId(comment.board_comment_idx);
                          setCommentInput(comment.board_comment_content);
                        }}>
                        수정
                      </button>
                      <button
                        className="text-[#ff5353] hover:underline cursor-pointer"
                        onClick={() => {
                          if (
                            window.confirm("정말로 이 댓글을 삭제하시겠습니까?")
                          ) {
                            setComments((prev) =>
                              prev.filter(
                                (cc) =>
                                  cc.board_comment_idx !==
                                  comment.board_comment_idx
                              )
                            );
                          }
                        }}>
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {comments.length > 40 && (
            <button className="px-4 py-2 bg-[#1b1f2e] hover:bg-[#262b40] text-gray-300 rounded w-full border border-[#262b40] transition-colors">
              댓글 더보기
            </button>
          )}
        </section>
      </div>
    </div>
  );
};
export default PostDetail;
