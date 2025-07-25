import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "../../../../4_Shared/hookForm/PostCommentInput/schema";
import useManageComments from "./model/useManageComments";

import Comment from "./ui/Comment";
import usePostCommentHandler from "./model/usePostCommentHandler";
import PostCommentInput from "../../../../4_Shared/hookForm/PostCommentInput";
import { useIsLogin } from "../../../../4_Shared/lib/useMyInfo";

const CommentSection = (props: CommentSectionProps) => {
  const { initialComments } = props;

  const [isLogin] = useIsLogin();

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
          if (!isLogin) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
          }
          postComment(data.content);
          handleAddComment(data);
          reset();
        })}
        className="mb-6">
        <PostCommentInput register={register} errors={errors} />

        <div className="flex justify-end">
          <button
            className={`px-4 py-2 rounded text-white transition-colors ${
              isLogin
                ? "bg-grass hover:bg-grass/80"
                : "bg-gray-500 cursor-not-allowed"
            }`}>
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
          comments.map((comment) => (
            <Comment
              comment={comment}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              handleRollbackComment={handleRollbackComment}
              discardLastHistory={discardLastHistory}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default CommentSection;
