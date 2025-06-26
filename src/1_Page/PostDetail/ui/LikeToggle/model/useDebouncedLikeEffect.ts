// src/1_Page/PostDetail/ui/LikeToggle/model/useDebouncedLikeEffect.ts
import useDeleteBoardLike from "../../../../../3_Entity/Board/useDeleteBoardLike";
import usePostBoardLike from "../../../../../3_Entity/Board/usePostBoardLike";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";
import useDebounce from "../../../../../4_Shared/model/useDebounce";

const useDebouncedLikeEffect = (isLiked: boolean): [() => void] => {
  const postId = useParamInteger("postId");
  const [postLike] = usePostBoardLike(postId);
  const [deleteLike] = useDeleteBoardLike(postId);

  // 디바운스 없이 순수 ‘API 호출 결정’ 로직
  const toggleLike = () => {
    if (isLiked) {
      deleteLike();
    } else {
      postLike();
    }
  };

  const debouncedToggle = useDebounce(toggleLike, 1000);

  return [debouncedToggle];
};

export default useDebouncedLikeEffect;
