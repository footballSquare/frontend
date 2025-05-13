import usePutComment from "../../../../../../3_Entity/Board/usePutComment";
import { useMyUserIdx } from "../../../../../../4_Shared/lib/useMyInfo";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import { getIsLong } from "./util/getIsLong";
import React from "react";

const Comment = (props: CommentProps) => {
  const { comment, board_list_idx, handleEditComment, handleDeleteComment } =
    props;

  const [myIdx] = useMyUserIdx();
  const { board_comment_idx } = comment;

  const [deleteComment, deleteServerState] = useDeleteComment();

  const [putComment, putServerState] = usePutComment(
    board_list_idx,
    board_comment_idx
  );

  React.useEffect(() => {
    if (putServerState) {
      switch (putServerState.status) {
        case 200:
          alert("댓글이 수정되었습니다.");
          break;
        case 400:
          alert("댓글 수정에 실패했습니다.");
          break;
        default:
          alert("알 수 없는 오류가 발생했습니다.");
          break;
      }
    }
  }, [putServerState]);

  const [commentInput, setCommentInput] = React.useState("");
  const [isEditMode, handleEditMode] = useToggleState();
  const [isExpanded, handleToggleExpanded] = useToggleState();

  const previewLimit = 100;
  const lines = comment.board_comment_content.split(/\r?\n/);
  const isLong = getIsLong(comment.board_comment_content);

  return (
    <div
      key={comment.board_comment_idx}
      className={`${
        isEditMode
          ? "border-l-4 border-grass rounded-lg mb-4 p-4"
          : " rounded-lg mb-4 p-4"
      }  `}>
      {/* 작성자 헤더 */}
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-gray-300">
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

      {/* 본문 or 수정 모드 */}
      {isEditMode ? (
        <div className="space-y-3 mt-3">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="w-full border border-grass p-2 text-gray-200 rounded-md"
          />
          <div className="flex space-x-2 justify-end">
            <button
              className="px-2 py-1 bg-grass text-black rounded"
              onClick={() => {
                handleEditComment(comment.board_comment_idx, commentInput);
                handleEditMode();
              }}>
              수정 완료
            </button>
            <button
              className="px-2 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
              onClick={() => {
                handleEditMode();
                setCommentInput(comment.board_comment_content);
              }}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p className="whitespace-pre-wrap text-gray-300">
            {isExpanded || !isLong
              ? comment.board_comment_content
              : lines.length > 4
              ? lines.slice(0, 4).join("\n")
              : comment.board_comment_content.slice(0, previewLimit)}
          </p>
          {isLong && (
            <button
              className="text-grass hover:underline text-sm mt-1"
              onClick={handleToggleExpanded}>
              {isExpanded ? "간략히 보기" : "... 자세히 보기"}
            </button>
          )}
          {myIdx === comment.player_list_idx && (
            <div className="flex space-x-2 mt-3 justify-end">
              <button
                className="text-gray-400 hover:underline"
                onClick={() => {
                  handleEditMode();
                  setCommentInput(comment.board_comment_content);
                  putComment(comment.board_comment_content);
                }}>
                수정
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteComment(comment.board_comment_idx)}>
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
