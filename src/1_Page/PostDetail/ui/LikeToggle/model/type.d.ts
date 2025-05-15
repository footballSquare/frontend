type UseLikeCountReturn = {
  likeCount: number;
  increaseLikeCount: () => void;
  decreaseLikeCount: () => void;
};
type UseOptimisticLikeToggleReturn = {
  isLiked: boolean;
  likeCount: number;
  toggleLike: () => void;
};
