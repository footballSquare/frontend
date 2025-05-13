import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteComment = (
  boardListIdx: number,
  boardCommentIdx: number
): [() => void, serverState: Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();

  const deleteComment = () => {
    const endPoint = `/board/${boardListIdx}/comment/${boardCommentIdx}`;
    request("POST", endPoint, null, true);
  };

  return [deleteComment, serverState];
};

export default useDeleteComment;
