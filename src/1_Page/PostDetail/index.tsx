import { useNavigate } from "react-router-dom";
import useGetBoardDetail from "../../3_Entity/Board/useGetBoardDetail";
import useParamInteger from "../../4_Shared/model/useParamInteger";
import CommentSection from "./ui/CommentSection";
import useDeleteBoard from "../../3_Entity/Board/useDeleteBoard";

import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import LikeToggle from "./ui/LikeToggle";
import useGoBackHandler from "./model/useGobackHandler";
import { formatDateKorean } from "../../4_Shared/lib/dateFormatter";

const PostDetail = () => {
  const navigate = useNavigate();

  const postId = useParamInteger("postId");
  const [board] = useGetBoardDetail(postId);
  const [deleteBoard] = useDeleteBoard(postId);
  const { handleGoBack } = useGoBackHandler();

  const {
    board_category_idx,
    board_list_created_at,
    board_list_title,
    board_list_content,
    board_list_img,
    board_list_idx,
    board_list_likecount,
    board_list_updated_at,
    board_list_view_count,
    player,
    is_liked,
  } = board;

  const myUserIdx = useAuthStore((state) => state.userIdx);
  const player_list_idx = player?.player_list_idx ?? null;
  const player_list_profile_image = player?.player_list_profile_image ?? null;
  const player_list_nickname = player?.player_list_nickname ?? "";
  const firstImage = board_list_img?.[0];

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-gray-200 px-4 sm:px-6">
      {/* 게시글 헤더 */}
      <div className="space-y-3 border-b border-gray-700 pb-6">
        {/* 뒤로가기 버튼과 카테고리/날짜 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1 text-gray-400 hover:text-gray-200 transition-colors p-1 -ml-1"
              onClick={handleGoBack}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm">뒤로</span>
            </button>
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full text-white bg-grass`}>
              {board_category_idx === 1 ? "공지" : "자유"}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {formatDateKorean(board_list_created_at)}
          </p>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 break-words">
          {board_list_title}
        </h1>
        {/* 게시글 통계 */}
        <div className="flex items-center justify-between space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>조회수 {board_list_view_count}</span>
            {board_list_updated_at &&
              board_list_created_at !== board_list_updated_at && (
                <span>수정: {formatDateKorean(board_list_updated_at)}</span>
              )}
          </div>
          <LikeToggle boardLikeCount={board_list_likecount} isLike={is_liked} />
        </div>

        {/* 작성자 정보 */}
        <div
          className="flex items-center space-x-2 cursor-pointer hover:underline"
          onClick={() => {
            navigate(`/profile/${player_list_idx}`);
          }}>
          <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center text-gray-300">
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

        {/* 게시글 이미지 */}
        {firstImage && (
          <div className="p-2 border border-gray-700 rounded">
            <img
              src={firstImage}
              alt="게시글 이미지"
              className="mx-auto object-scale-down max-w-full h-auto"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* 게시글 작업 버튼 */}
      <div className="flex flex-wrap gap-2 pt-2">
        {myUserIdx === player_list_idx && (
          <div className="flex gap-2">
            <button
              className="text-grass hover:underline cursor-pointer"
              onClick={() => navigate(`/post/write/edit/${board_list_idx}`)}>
              수정
            </button>
            <button
              className="text-red-500 hover:underline cursor-pointer"
              onClick={() => {
                if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
                  deleteBoard();
                }
              }}>
              삭제
            </button>
          </div>
        )}
      </div>

      <CommentSection initialComments={board.comments || []} />
    </div>
  );
};
export default PostDetail;
