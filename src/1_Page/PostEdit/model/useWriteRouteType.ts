import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY_MAP } from "../constant/constant";

const useWriteRouteType = (): UseWriteRouteTypeReturn => {
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

  return {
    isNew,
    isEdit,
    categoryIndex,
    postId: numericPostId,
  };
};

export default useWriteRouteType;
