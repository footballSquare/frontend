import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostBoardLike = (
  boardListIdx: number
): [() => void, serverState: Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();

  const postBoardLike = () => {
    const endPoint = `/board/${boardListIdx}/like`;
    request("POST", endPoint, null, true);
  };

  return [postBoardLike, serverState];
};

export default usePostBoardLike;
