import { useNavigate } from "react-router-dom";
import useGetBoardDetail from "../../3_Entity/Board/useGetBoardDetail";
import useParamInteger from "../../4_Shared/model/useParamInteger";
import CommentSection from "./ui/CommentSection";
import useDeleteBoard from "../../3_Entity/Board/useDeleteBoard";
import { utcFormatter } from "../../4_Shared/lib/utcFormatter";
import { useMyUserIdx } from "../../4_Shared/lib/useMyInfo";

const PostDetail = () => {
  const navigate = useNavigate();

  const postId = useParamInteger("postId");
  const [board] = useGetBoardDetail(postId);
  const [deleteBoard] = useDeleteBoard(postId);

  const {
    board_category_idx,
    board_list_created_at,
    board_list_title,
    board_list_content,
    board_list_img,
    board_list_idx,
    player,
  } = board;

  const [myIdx] = useMyUserIdx();
  const player_list_idx = player.player_list_idx ?? null;
  const player_list_profile_image = player?.player_list_profile_image ?? null;
  const player_list_nickname = player?.player_list_nickname ?? "";
  const firstImage = board_list_img?.[0];

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-gray-200 px-4 sm:px-6">
      {/* 게시글 헤더 */}
      <div className="space-y-3 border-b border-gray-700 pb-6">
        <div className="flex justify-between items-center">
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full text-white bg-grass`}>
            {board_category_idx === 1 ? "공지" : "자유"}
          </span>
          <p className="text-sm text-gray-400">
            {utcFormatter(board_list_created_at)}
          </p>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 break-words">
          {board_list_title}
        </h1>

        <div className="flex items-center space-x-2">
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

        {firstImage && (
          <div className="p-2 border border-gray-700 rounded">
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
        {myIdx === player_list_idx && (
          <div>
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
        <button
          className="text-gray-400 hover:underline cursor-pointer ml-auto"
          // to do 목록 페이지 구현시 설정할것
          onClick={() => navigate(-1)}>
          목록
        </button>
      </div>

      <CommentSection initialComments={board.comments || []} />
    </div>
  );
};
export default PostDetail;
