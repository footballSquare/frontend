import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutComment = (
  boardListIdx: number,
  boardCommentIdx: number
): [(content: string) => void, serverState: Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();

  const putComment = (content: string) => {
    const endPoint = `/board/${boardListIdx}/comment/${boardCommentIdx}`;
    request("PUT", endPoint, { board_comment_content: content }, true);
  };

  return [putComment, serverState];
};

export default usePutComment;
