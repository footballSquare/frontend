import usePostBoardLike from "../../../../3_Entity/Board/usePostBoardLike";
import useDeleteBoardLike from "../../../../3_Entity/Board/useDeleteBoardLike";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import useIsLiked from "./model/useIsLiked";
import useLikeCount from "./model/useLikeCount";

const LikeToggle = (props: LikeToggleProps) => {
  const { boardLikeCount, isLike } = props;

  const [isLiked, handleToogleLike] = useIsLiked(isLike);
  const { likeCount, increaseLikeCount, decreaseLikeCount } =
    useLikeCount(boardLikeCount);

  const postId = useParamInteger("postId");
  const [postBoardLike] = usePostBoardLike(postId);
  const [deleteBoardLike] = useDeleteBoardLike(postId);

  return (
    <button
      className="flex items-center space-x-1 focus:outline-none"
      onClick={() => {
        if (isLiked) {
          handleToogleLike();
          decreaseLikeCount();
          deleteBoardLike();
        } else {
          handleToogleLike();
          increaseLikeCount();
          postBoardLike();
        }
      }}>
      {isLiked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-red-500">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-gray-100">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
      <span className="text-gray-100">{likeCount}</span>
    </button>
  );
};

export default LikeToggle;
