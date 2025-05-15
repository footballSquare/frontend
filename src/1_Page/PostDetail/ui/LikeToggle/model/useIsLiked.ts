import React from "react";

const useIsLiked = (initialIsLike: boolean): [boolean, () => void] => {
  const [isLiked, setIsLiked] = React.useState(false);
  const handleToogleLike = () => {
    setIsLiked((prev) => !prev);
  };

  React.useEffect(() => {
    setIsLiked(initialIsLike);
  }, [initialIsLike]);

  return [isLiked, handleToogleLike];
};

export default useIsLiked;
