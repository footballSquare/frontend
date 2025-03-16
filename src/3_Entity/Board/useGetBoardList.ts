import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockBoardList } from "../../4_Shared/mock/boardList";

const ITEMS_PER_PAGE = 10;

const useGetBoardList = (props: UseGetBoardListProps): [Board[], boolean, boolean] => {
  const { category, page } = props;
  const [serverState, request, loading] = useFetch();
  const [boardList, setBoardList] = React.useState<Board[]>(mockBoardList);
  const [hasMoreContent, setHasMoreContent] = React.useState<boolean>(false);

  React.useEffect(() => {
    request(mockBoardList);
  }, [category, page]);

  React.useEffect(() => {
    if (!loading && serverState) {
      if (Array.isArray(serverState)) {
        setBoardList(serverState as Board[]);
        setHasMoreContent((serverState as Board[]).length >= ITEMS_PER_PAGE);
      } else {
        console.error("serverState is not an array:", serverState);
      }
    }
  }, [loading, serverState]);

  return [boardList, hasMoreContent, loading];
};

export default useGetBoardList;
