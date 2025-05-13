import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteComment = (
  boardCommentIdx: number
): [() => void, serverState: Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();

  const deleteComment = () => {
    const endPoint = `/board/comment/${boardCommentIdx}`;
    request("DELETE", endPoint, null, true);
  };

  return [deleteComment, serverState];
};

export default useDeleteComment;
