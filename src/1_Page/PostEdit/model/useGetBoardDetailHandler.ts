import { useNavigate, useParams } from "react-router-dom";
import useGetBoardDetail from "../../../3_Entity/Board/useGetBoardDetail";

const useGetBoardDetailHandler = () => {
  const navigate = useNavigate();

  const { postId = "new" } = useParams<{ postId: string }>();
  const isEdit = postId !== "new";
  const numericPostId = isEdit ? Number(postId) : -1;
  if (isEdit && Number.isNaN(numericPostId)) {
    navigate("/404");
  }

  const [boadDetail] = useGetBoardDetail(numericPostId);

  return {
    boadDetail,
    isEdit,
    postId: numericPostId,
  };
};

export default useGetBoardDetailHandler;
