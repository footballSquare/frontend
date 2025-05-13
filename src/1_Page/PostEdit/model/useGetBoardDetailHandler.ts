import { useNavigate, useParams } from "react-router-dom";
import useGetBoardDetail from "../../../3_Entity/Board/useGetBoardDetail";
import { CATEGORY_MAP } from "../constant/constant";

const useGetBoardDetailHandler = (): UseGetBoardDetailHandlerReturn => {
  const navigate = useNavigate();
  const { category: categoryParam, postId: postIdParam } = useParams<{
    category?: string;
    postId?: string;
  }>();

  // 경로 분기: 새 글(route: /write/new/:category) vs 수정(route: /write/edit/:postId)
  const isNew = categoryParam !== undefined && postIdParam === undefined;
  const isEdit = postIdParam !== undefined && categoryParam === undefined;

  // 둘 다 undefined 이거나 둘 다 정의된 경우는 잘못된 경로
  if ((!isNew && !isEdit) || (isNew && isEdit)) {
    navigate("/404", { replace: true });
  }

  // 새 글일 때: categoryParam 유효성 검사
  let categoryIndex;
  if (isNew) {
    categoryIndex = CATEGORY_MAP[categoryParam!];
    if (categoryIndex === undefined) {
      navigate("/404", { replace: true });
    }
  }

  // 수정일 때: postIdParam 숫자 변환 및 검증
  const numericPostId = isEdit ? Number(postIdParam!) : -1;
  if (isEdit && Number.isNaN(numericPostId)) {
    navigate("/404", { replace: true });
  }

  // 게시글 상세 조회
  const [boardDetail] = useGetBoardDetail(numericPostId);

  return {
    boardDetail,
    isNew,
    postId: numericPostId,
    categoryIndex,
  };
};

export default useGetBoardDetailHandler;
