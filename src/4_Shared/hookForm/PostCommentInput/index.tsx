const PostCommentInput = (props: PostCommentInputProps) => {
  const { register, errors } = props;
  return (
    <div>
      <textarea
        {...register("content")}
        placeholder="댓글을 작성하세요..."
        className="w-full bg-gray-900 border border-gray-800 rounded p-3 text-gray-200 mb-1 focus:ring-2 focus:ring-grass"
        rows={3}
      />
      {errors.content && (
        <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>
      )}
    </div>
  );
};
export default PostCommentInput;
