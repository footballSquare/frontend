import { useIsLogin } from "../../../../4_Shared/lib/useMyInfo";
import useDebouncedLikeEffect from "./model/useDebouncedLikeEffect";
import useOptimisticLikeToggle from "./model/useOptimisticLikeToggle";

import LikeFillIcon from "../../../../4_Shared/assets/svg/likeFill.svg";
import likeNotFillIcon from "../../../../4_Shared/assets/svg/likeNotFill.svg";

const LikeToggle = (props: LikeToggleProps) => {
  const { boardLikeCount, isLike } = props;

  const [isLogin] = useIsLogin();

  const { isLiked, likeCount, toggleLike } = useOptimisticLikeToggle(
    boardLikeCount,
    isLike
  );

  const [handleBtnClick] = useDebouncedLikeEffect(isLiked);

  return (
    <button
      className="flex items-center space-x-1 focus:outline-none"
      onClick={() => {
        if (!isLogin) {
          alert("로그인 후 이용 가능합니다.");
          return;
        }
        toggleLike();
        handleBtnClick();
      }}>
      {isLiked ? (
        <img src={LikeFillIcon} alt="좋아요" className="w-5 h-5" />
      ) : (
        <img src={likeNotFillIcon} alt="좋아요 취소" className="w-5 h-5" />
      )}
      <span className="text-gray-100">{likeCount}</span>
    </button>
  );
};

export default LikeToggle;
