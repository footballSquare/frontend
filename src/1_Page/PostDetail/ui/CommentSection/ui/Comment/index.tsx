import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMyUserIdx } from "../../../../../../4_Shared/lib/useMyInfo";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import useCommentPutHandler from "./model/usePutCommentHandler";
import useDeleteCommentHandler from "./model/useDeleteCommentHandler";
import { getIsLong } from "./util/getIsLong";
import { schema } from "./lib/schema";
import { utcFormatter } from "../../../../../../4_Shared/lib/utcFormatter";

const Comment = (props: CommentProps) => {
  const {
    comment,
    handleEditComment,
    handleDeleteComment,
    handleRollbackComment,
    discardLastHistory,
  } = props;

  const [myIdx] = useMyUserIdx();
  const { board_comment_idx } = comment;

  const handlerProps = {
    board_comment_idx,
    handleRollbackComment,
    discardLastHistory,
  };

  const [putComment] = useCommentPutHandler(handlerProps);
  const [deleteComment] = useDeleteCommentHandler(handlerProps);

  const [isEditMode, handleEditMode] = useToggleState();
  const [isExpanded, handleToggleExpanded] = useToggleState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ content: string }>({
    resolver: yupResolver(schema),
    defaultValues: { content: comment.board_comment_content },
  });

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
            {utcFormatter(comment.board_comment_created_at)}
          </p>
        </div>
      </div>

      {/* 본문 or 수정 모드 */}
      {isEditMode ? (
        <form
          onSubmit={handleSubmit((data) => {
            handleEditComment(comment.board_comment_idx, data.content);
            handleEditMode();
            putComment(data.content);
          })}
          className="space-y-3 mt-3">
          <textarea
            {...register("content")}
            className="w-full border border-grass p-2 text-gray-200 rounded-md"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
          <div className="flex space-x-2 justify-end">
            <button
              type="submit"
              className="px-2 py-1 bg-grass text-black rounded">
              수정 완료
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
              onClick={() => {
                reset();
                handleEditMode();
              }}>
              취소
            </button>
          </div>
        </form>
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
                type="button"
                className="text-gray-400 hover:underline"
                onClick={() => {
                  handleEditMode();
                  reset();
                }}>
                수정
              </button>
              <button
                type="button"
                className="text-red-500 hover:underline"
                onClick={() => {
                  if (confirm("정말 삭제하시겠습니까?")) {
                    handleDeleteComment(comment.board_comment_idx);
                    deleteComment();
                  }
                }}>
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
