const PostCommentInput = (props: PostCommentInputProps) => {
  const { register, errors, isCommentEdit } = props;
  return (
    <div>
      <textarea
        {...register("content")}
        placeholder={
          isCommentEdit ? "댓글을 수정하세요..." : "댓글을 작성하세요..."
        }
        className={`w-full border rounded p-3 text-gray-200 mb-1 focus:ring-2 ${
          isCommentEdit
            ? "bg-gray-900 border-gray-800 focus:ring-grass"
            : "border-grass"
        }`}
        rows={3}
      />
      {errors.content && (
        <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>
      )}
    </div>
  );
};
export default PostCommentInput;
