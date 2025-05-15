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

  let categoryIndex: number | undefined = undefined;
  if (isNew) {
    categoryIndex = CATEGORY_MAP[categoryParam!];
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
    categoryIndex: -1, // 혹은 null로 처리
    postId: numericPostId,
  };
};

export default useWriteRouteType;
