import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 10;

const useGetBoardList = (
  props: UseGetBoardListProps
): [
  boardList: Board[],
  hasMoreContent: boolean,
  isLoading: boolean,
  isError: boolean
] => {
  const { page, category } = props;
  const [request] = useFetch();
  const [boardList, setBoardList] = React.useState<Board[]>([]);
  const [hasMoreContent, setHasMoreContent] = React.useState(true);
  const queryClient = useQueryClient();

  // 게시판 목록 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ["boardList", page, category],
    queryFn: () =>
      request("GET", `/board/?category=${category}&page=${page}`, null, false),
    staleTime: 1000 * 5, // 5 seconds
  });

  // 추가 페이지 확인 & prefetch next page
  React.useEffect(() => {
    if (!isLoading && !isError) {
      setBoardList((data as { board_list: Board[] }).board_list);
      setHasMoreContent(false);
      if (
        (data as { board_list: Board[] }).board_list.length >= ITEMS_PER_PAGE
      ) {
        setHasMoreContent(true);
        queryClient.prefetchQuery({
          queryKey: ["boardList", page + 1, category],
          queryFn: () =>
            request(
              "GET",
              `/board/?category=${category}&page=${page + 1}`,
              null,
              false
            ),
          staleTime: 1000 * 60 * 3, // 3 minutes
        });
      }
    }
  }, [isLoading, isError, data, page, category, request, queryClient]);

  return [boardList, hasMoreContent, isLoading, isError];
};

export default useGetBoardList;
