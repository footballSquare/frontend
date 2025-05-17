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

  if ((!isNew && !isEdit) || (isNew && isEdit)) {
    navigate("/404", { replace: true });
  }

  let categoryIndex = -1;
  if (isNew) {
    categoryIndex =
      CATEGORY_MAP[categoryParam as keyof typeof CATEGORY_MAP] ?? -1;
    if (categoryIndex === undefined) {
      navigate("/404", { replace: true });
    }
  }

  const numericPostId = isEdit ? Number(postIdParam!) : -1;
  if (isEdit && Number.isNaN(numericPostId)) {
    navigate("/404", { replace: true });
  }

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
