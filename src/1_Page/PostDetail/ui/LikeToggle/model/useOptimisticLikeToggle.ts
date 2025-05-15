import React from "react";

const useOptimisticLikeToggle = (
  initBoardLikeCount: number,
  initIsLike: boolean
) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);

  // side effect
  React.useEffect(() => {
    setIsLiked(initIsLike);
  }, [initIsLike]);
  React.useEffect(() => {
    setLikeCount(initBoardLikeCount);
  }, [initBoardLikeCount]);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return { isLiked, likeCount, toggleLike };
};
export default useOptimisticLikeToggle;
