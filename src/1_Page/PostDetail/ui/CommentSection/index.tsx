import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "../../../../4_Shared/hookForm/PostCommentInput/schema";
import useManageComments from "./model/useManageComments";

import Comment from "./ui/Comment";
import usePostCommentHandler from "./model/usePostCommentHandler";
import PostCommentInput from "../../../../4_Shared/hookForm/PostCommentInput";

const CommentSection = (props: CommentSectionProps) => {
  const { initialComments } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>({
    resolver: yupResolver(commentSchema),
  });

  const {
    comments,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    handleRollbackComment,
    discardLastHistory,
    handleSetCommentsIdx,
  } = useManageComments(initialComments);

  const [postComment] = usePostCommentHandler(handleSetCommentsIdx);
  return (
    <div className="pt-6 border-t border-gray-800">
      <h3 className="text-lg font-medium mb-4 text-gray-200">
        댓글 {comments.length}개
      </h3>

      {/* 새 댓글 입력 */}
      <form
        onSubmit={handleSubmit((data) => {
          postComment(data.content);
          handleAddComment(data);
          reset();
        })}
        className="mb-6">
        <PostCommentInput register={register} errors={errors} />

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
          comments
            .slice(0, 40)
            .map((comment) => (
              <Comment
                comment={comment}
                handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment}
                handleRollbackComment={handleRollbackComment}
                discardLastHistory={discardLastHistory}
              />
            ))
        )}

        {comments.length > 40 && (
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded w-full border border-gray-800 transition-colors">
            댓글 더보기
          </button>
        )}
      </section>
    </div>
  );
};

export default CommentSection;
