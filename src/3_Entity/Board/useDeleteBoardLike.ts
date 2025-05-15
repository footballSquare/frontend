import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteBoardLike = (
  boardListIdx: number
): [() => void, serverState: Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();

  const deleteBoardLike = () => {
    const endPoint = `/board/${boardListIdx}/like`;
    request("DELETE", endPoint, null, true);
  };

  return [deleteBoardLike, serverState];
};

export default useDeleteBoardLike;
