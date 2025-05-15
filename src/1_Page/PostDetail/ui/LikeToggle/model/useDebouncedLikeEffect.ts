import React from "react";
import useDeleteBoardLike from "../../../../../3_Entity/Board/useDeleteBoardLike";
import usePostBoardLike from "../../../../../3_Entity/Board/usePostBoardLike";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";
// 실제 API 요청을 debounce하여 처리하는 훅

const useDebouncedLikeEffect = (isLiked: boolean): [() => void] => {
  const postId = useParamInteger("postId");

  const [postLike] = usePostBoardLike(postId);
  const [deleteLike] = useDeleteBoardLike(postId);

  const likeHistoryRef = React.useRef<boolean[]>([]);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleDebouncedEffect = () => {
    if (likeHistoryRef.current.length === 0) {
      likeHistoryRef.current.push(isLiked);
    }
    likeHistoryRef.current.push(!isLiked);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const final = likeHistoryRef.current.at(-1);
      const first = likeHistoryRef.current[0];

      if (final !== first) {
        if (final) {
          postLike();
        } else {
          deleteLike();
        }
      }

      likeHistoryRef.current = [];
    }, 1000);
  };

  return [handleDebouncedEffect];
};
export default useDebouncedLikeEffect;
