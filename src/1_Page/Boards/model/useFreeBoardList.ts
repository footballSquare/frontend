import React from "react";
import useGetBoardList from "../../../3_Entity/Board/useGetBoardList";

const useFreeBoardList = (): [
  freeBoardList: Board[],
  increasePage: () => void,
  decreasePage: () => void,
  resetPage: () => void,
  hasMoreContent: boolean,
  page: number,
  loading: boolean
] => {
  const [page, setPage] = React.useState<number>(0);
  const [freeBoardList, hasMoreContent, isLoading] = useGetBoardList({
    page,
    category: 0,
  });

  const increasePage = () => {
    if (hasMoreContent) {
      setPage((prev) => prev + 1);
    }
  };
  const decreasePage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };
  const resetPage = () => {
    setPage(0);
  };

  return [
    freeBoardList,
    increasePage,
    decreasePage,
    resetPage,
    hasMoreContent,
    page,
    isLoading,
  ];
};

export default useFreeBoardList;
