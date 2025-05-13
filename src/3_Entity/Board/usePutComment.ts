import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutComment = (
  boardListIdx: number,
  boardCommentIdx: number
): [
  putChampionship: (content: string) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const putChampionship = (content: string) => {
    const endPoint = `/board/${boardListIdx}/comment/${boardCommentIdx}`;
    request("POST", endPoint, { board_comment_content: content }, true);
  };

  return [putChampionship, serverState];
};

export default usePutComment;
