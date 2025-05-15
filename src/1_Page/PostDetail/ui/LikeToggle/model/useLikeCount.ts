import React from "react";

const useLikeCount = (initialCount: number): UseLikeCountReturn => {
  const [likeCount, setLikeCount] = React.useState<number>(0);

  React.useEffect(() => {
    setLikeCount(initialCount);
  }, [initialCount]);
  const increaseLikeCount = () => {
    setLikeCount((prev) => prev + 1);
  };
  const decreaseLikeCount = () => {
    setLikeCount((prev) => prev - 1);
  };
  return { likeCount, increaseLikeCount, decreaseLikeCount };
};
export default useLikeCount;
