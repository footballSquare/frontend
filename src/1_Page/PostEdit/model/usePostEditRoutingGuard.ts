import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY_MAP } from "../constant/constant";
import { useIsLogin } from "../../../4_Shared/lib/useMyInfo";
import React from "react";

const usePostEditRoutingGuard = (): UseWriteRouteTypeReturn => {
  const navigate = useNavigate();
  const { category: categoryParam, postId: postIdParam } = useParams<{
    category?: string;
    postId?: string;
  }>();

  const isNew = categoryParam !== undefined && postIdParam === undefined;
  const isEdit = postIdParam !== undefined && categoryParam === undefined;

  // isNew와 isEdit이 모두 false인 경우
  if (!isNew && !isEdit) {
    navigate("/404", { replace: true });
  }

  // isNew인 경우 categoryIdx를 CATEGORY_MAP에서 찾습니다.
  let categoryIndex = -1;
  if (isNew) {
    categoryIndex =
      CATEGORY_MAP[categoryParam as keyof typeof CATEGORY_MAP] ?? -1;
    // categoryIdx가 -1인 경우 404 페이지로 리다이렉트합니다.
    if (categoryIndex === -1) {
      navigate("/404", { replace: true });
    }
  }

  // isEdit인 경우 postId를 숫자로 변환합니다.
  const numericPostId = isEdit ? Number(postIdParam!) : -1;
  if (isEdit && Number.isNaN(numericPostId)) {
    navigate("/404", { replace: true });
  }

  // 로그인 여부를 확인합니다.
  const [isLogin] = useIsLogin();
  React.useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login", { replace: true });
    }
  }, [isLogin]);

  return {
    isNew,
    isEdit,
    categoryIndex,
    postId: numericPostId,
  };
};

export default usePostEditRoutingGuard;
