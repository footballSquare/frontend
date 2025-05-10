import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetCommunityBoardList = (
  props: UseGetCommunityBoardListProps
): [CommunityBoard[], boolean, boolean] => {
  const { communityIdx = 0, page } = props;
  const [serverState, request, loading] = useFetchData();
  const [communityBoardList, setCommunityBoardList] = React.useState<
    CommunityBoard[]
  >([]);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(true);
  const ITEMS_PER_PAGE = 10;

  React.useEffect(() => {
    request(
      "GET",
      `/community/${communityIdx}/board?page=${page}`,
      null,
      false
    );
  }, [request, communityIdx, page]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityBoardList((prev: CommunityBoard[]) => [
        ...prev,
        ...(serverState as { board_list: CommunityBoard[] }).board_list,
      ]);
      setHasMoreContent(
        (serverState as { board_list: CommunityBoard[] }).board_list.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [communityBoardList, hasMoreContent, loading];
};

export default useGetCommunityBoardList;
