import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostComment = (
  boardListIdx: number
): [(ostText: string) => void, Record<string, unknown> | null, boolean] => {
  const [serverState, request, loading] = useFetchData();

  const postComment = (postText: string) => {
    const endPoint = `/board/${boardListIdx}/comment`;
    request("POST", endPoint, { board_comment_content: postText }, true);
  };

  return [postComment, serverState, loading];
};
export default usePostComment;
