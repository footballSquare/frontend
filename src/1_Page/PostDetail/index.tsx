import React from "react";
import { useNavigate } from "react-router-dom";

interface Player {
  player_list_idx: number;
  player_list_nickname: string;
  player_list_profile_image: string | null;
}

interface BoardCommentEntity {
  player_list_idx: number;
  board_comment_idx: number;
  player_list_nickname: string;
  board_comment_content: string;
  board_comment_created_at: string;
  board_comment_updated_at: string;
  player_list_profile_image: string | null;
}

interface BoardEntity {
  player: Player;
  comments: BoardCommentEntity[];
  board_list_idx: number;
  board_list_img: string[];
  board_list_title: string;
  board_category_idx: number;
  board_list_content: string;
  board_list_likecount: number;
  board_list_created_at: string;
  board_list_updated_at: string;
  board_list_view_count: number;
}

interface BoardApiResponse {
  board: {
    board: BoardEntity;
  };
}

interface PostComment {
  id: number;
  author: string;
  body: string;
  createdAt: string;
  avatar?: string | null;
}

const dummyData: BoardApiResponse = {
  board: {
    board: {
      player: {
        player_list_idx: 3,
        player_list_nickname: "KFPL운영자",
        player_list_profile_image: null,
      },
      comments: [
        {
          player_list_idx: 10,
          board_comment_idx: 1,
          player_list_nickname: "차범근",
          board_comment_content: "좋습니다.",
          board_comment_created_at: "2025-03-18T04:17:41.86784",
          board_comment_updated_at: "2025-03-18T04:17:41.86784",
          player_list_profile_image:
            "https://dummyimage.com/150x150/000/fff&text=차범근",
        },
        {
          player_list_idx: 11,
          board_comment_idx: 2,
          player_list_nickname: "기성용",
          board_comment_content: "뭐가요?",
          board_comment_created_at: "2025-03-18T04:25:03.5149",
          board_comment_updated_at: "2025-03-18T04:25:03.5149",
          player_list_profile_image:
            "https://dummyimage.com/150x150/000/fff&text=기성용",
        },
      ],
      board_list_idx: 3,
      board_list_img: [
        "https://footballsquare-evidance-img.s3.ap-northeast-2.amazonaws.com/board/1742270153277-images__2__.jpg",
      ],
      board_list_title: '"게시글을 수정하였습니다"',
      board_category_idx: 1,
      board_list_content: '"수정된 커뮤니티 게시판 글 입니다."',
      board_list_likecount: 0,
      board_list_created_at: "2025-03-18T03:36:42.116981",
      board_list_updated_at: "2025-03-18T03:55:53.412586",
      board_list_view_count: 0,
    },
  },
};

const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  // --- dummy response shaped like real API ---

  const board = dummyData.board.board;

  const post = React.useMemo(
    () => ({
      id: board.board_list_idx,
      categoryIdx: board.board_category_idx,
      createdAt: board.board_list_created_at,
      title: board.board_list_title.replace(/(^"|"$)/g, ""),
      body: board.board_list_content.replace(/(^"|"$)/g, ""),
      imageUrl: board.board_list_img?.[0],
      author: board.player.player_list_nickname,
      avatar: board.player.player_list_profile_image,
    }),
    [board]
  );

  const [comments, setComments] = React.useState<PostComment[]>(
    board.comments.map((c: BoardCommentEntity) => ({
      id: c.board_comment_idx,
      author: c.player_list_nickname,
      body: c.board_comment_content,
      createdAt: c.board_comment_created_at,
      avatar: c.player_list_profile_image,
    }))
  );
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [commentInput, setCommentInput] = React.useState("");
  const [newComment, setNewComment] = React.useState("");

  const handleDeletePost = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      // TODO: API 삭제
      navigate(-1);
    }
  };

  const handleEditComment = (id: number, body: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, body } : c)));
    setEditingId(null);
    setCommentInput("");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newId = Math.max(0, ...comments.map((c) => c.id)) + 1;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    setComments([
      ...comments,
      {
        id: newId,
        author: "현재 사용자", // 실제로는 로그인된 사용자 정보
        body: newComment,
        createdAt: formattedDate,
      },
    ]);

    setNewComment("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-[#e1e4ea]">
      {/* 게시글 헤더 */}
      <div className="space-y-3 border-b border-[#262b40] pb-6">
        <div className="flex justify-between items-center">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            {post.categoryIdx === 1 ? "공지" : "자유"}
          </span>
          <p className="text-sm text-gray-400">{post.createdAt}</p>
        </div>

        <h1 className="text-3xl font-bold text-gray-100">{post.title}</h1>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#262b40] overflow-hidden flex items-center justify-center text-gray-300">
            {post.avatar ? (
              <img
                src={post.avatar}
                alt={post.author}
                className="w-full h-full object-cover"
              />
            ) : (
              post.author.charAt(0)
            )}
          </div>
          <p className="text-gray-300">{post.author}</p>
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="space-y-6">
        <p className="whitespace-pre-wrap leading-relaxed text-gray-300 min-h-[200px]">
          {post.body}
        </p>

        {post.imageUrl && (
          <div className="p-2 bg-[#1b1f2e] border border-[#262b40] rounded">
            <img
              src={post.imageUrl}
              alt="게시글 이미지"
              className="max-h-96 mx-auto rounded"
            />
          </div>
        )}
      </div>

      {/* 게시글 작업 버튼 */}
      <div className="flex space-x-3 pt-2">
        <button
          className="text-[#2f80ed] hover:underline cursor-pointer"
          onClick={() => navigate(`/board/edit/${post.id}`)}>
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
            comments.slice(0, 40).map((c) => (
              <div key={c.id} className="p-4 border-b border-[#262b40]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#262b40] overflow-hidden flex items-center justify-center text-gray-300">
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        c.author.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-300">{c.author}</p>
                      <p className="text-xs text-gray-500">{c.createdAt}</p>
                    </div>
                  </div>
                </div>

                {editingId === c.id ? (
                  <div className="space-y-3 mt-3">
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="w-full bg-transparent border border-[#262b40] p-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex space-x-2 justify-end">
                      <button
                        className="text-[#2f80ed] hover:underline cursor-pointer"
                        onClick={() => handleEditComment(c.id, commentInput)}>
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
                      {c.body}
                    </p>
                    <div className="flex space-x-2 mt-3 justify-end">
                      <button
                        className="text-[#c9ced8] hover:underline cursor-pointer"
                        onClick={() => {
                          setEditingId(c.id);
                          setCommentInput(c.body);
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
                              prev.filter((cc) => cc.id !== c.id)
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
