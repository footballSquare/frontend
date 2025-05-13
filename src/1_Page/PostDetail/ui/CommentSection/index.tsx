import { useMyUserIdx } from "../../../../4_Shared/lib/useMyInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "./lib/schema";
import useManageComments from "./model/useManageComments";
import useEditngId from "./model/useEditngId";
import useCommentInput from "./model/useCommentInput";

const CommentSection = (props: CommentSectionProps) => {
  const { initialComments } = props;

  const [myIdx] = useMyUserIdx();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>({
    resolver: yupResolver(commentSchema),
  });

  const { editingId, handleEditMode, handleCancelEditMode } = useEditngId();
  const { commentInput, handleSetCommentInput } = useCommentInput();

  const { comments, handleAddComment, handleEditComment, handleDeleteComment } =
    useManageComments({
      initialComments,
    });

  /* 댓글 추가 */
  const onSubmitNew = (data: { content: string }) => {
    handleAddComment(data);
    reset();
  };

  return (
    <div className="pt-6 border-t border-gray-800">
      <h3 className="text-lg font-medium mb-4 text-gray-200">
        댓글 {comments.length}개
      </h3>

      {/* 새 댓글 입력 */}
      <form onSubmit={handleSubmit(onSubmitNew)} className="mb-6">
        <textarea
          {...register("content")}
          placeholder="댓글을 작성하세요..."
          className="w-full bg-gray-900 border border-gray-800 rounded p-3 text-gray-200 mb-1 focus:ring-2 focus:ring-grass"
          rows={3}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-grass hover:bg-grass/80 text-white transition-colors">
            댓글 작성
          </button>
        </div>
      </form>

      {/* 댓글 목록 */}
      <section className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            첫 댓글을 작성해보세요!
          </p>
        ) : (
          comments.slice(0, 40).map((comment) => (
            <div
              key={comment.board_comment_idx}
              className="p-4 border-b border-gray-800">
              {/* 작성자 헤더 */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-900 overflow-hidden flex items-center justify-center text-gray-300">
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
              {editingId === comment.board_comment_idx ? (
                <div className="space-y-3 mt-3">
                  <textarea
                    value={commentInput}
                    onChange={(e) => handleSetCommentInput(e.target.value)}
                    className="w-full bg-transparent border border-gray-800 p-2 text-gray-200 focus:ring-2 focus:ring-grass"
                  />
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="text-grass hover:underline"
                      onClick={() => {
                        handleEditComment(
                          comment.board_comment_idx,
                          commentInput
                        );
                        handleCancelEditMode();
                      }}>
                      수정 완료
                    </button>
                    <button
                      className="text-gray-400 hover:underline"
                      onClick={() => {
                        handleCancelEditMode();
                        handleSetCommentInput(comment.board_comment_content);
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
                  {myIdx === comment.player_list_idx && (
                    <div className="flex space-x-2 mt-3 justify-end">
                      <button
                        className="text-gray-400 hover:underline"
                        onClick={() => {
                          handleEditMode(comment.board_comment_idx);
                          handleSetCommentInput(comment.board_comment_content);
                        }}>
                        수정
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          handleDeleteComment(comment.board_comment_idx)
                        }>
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {comments.length > 40 && (
          <button className="px-4 py-2 bg-grass/10 hover:bg-grass/20 text-grass rounded w-full border border-grass/30 transition-colors">
            댓글 더보기
          </button>
        )}
      </section>
    </div>
  );
};

export default CommentSection;
