import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const ITEMS_PER_PAGE = 10;

const useGetBoardList = (
  props: UseGetBoardListProps
): [boardList: Board[], hasMoreContent: boolean, loading: boolean] => {
  const { page, category } = props;
  const [serverState, request, loading] = useFetchData();
  const [boardList, setBoardList] = React.useState<Board[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(true);
  React.useEffect(() => {
    request("GET", `/board/?category=${category}&page=${page}`, null, false);
  }, [page, request, category]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setBoardList((serverState as { board_list: Board[] }).board_list);
      setHasMoreContent(
        (serverState as { board_list: Board[] }).board_list.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [loading, serverState]);

  return [boardList, hasMoreContent, loading];
};

export default useGetBoardList;
