import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 10;

const useGetBoardList = (
  props: UseGetBoardListProps
): [boardList: Board[], hasMoreContent: boolean, loading: boolean] => {
  const { page, category } = props;
  const [request] = useFetch();
  const [boardList, setBoardList] = React.useState<Board[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(true);
  React.useEffect(() => {
    request("GET", `/board/?category=${category}&page=${page}`, null, false);
  }, [page, request, category]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["boardList", page, category],
    queryFn: () =>
      request("GET", `/board/?category=${category}&page=${page}`, null, false),
    staleTime: 1000 * 60 * 3, // 3 minutes
  });

  React.useEffect(() => {
    if (!isLoading && !isError) {
      setBoardList((data as { board_list: Board[] }).board_list);
      setHasMoreContent(
        (data as { board_list: Board[] }).board_list.length >=
          ITEMS_PER_PAGE
      );
    }
  }, [isLoading, isError]);

  return [boardList, hasMoreContent, isLoading];
};

export default useGetBoardList;
