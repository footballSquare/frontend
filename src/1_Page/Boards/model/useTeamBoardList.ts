import React from "react";
import useGetBoardList from "../../../3_Entity/Board/useGetBoardList";

const useTeamBoardList = (): [
  teamBoarList: Board[],
  increasePage: () => void,
  decreasePage: () => void,
  resetPage: () => void,
  hasMoreContent: boolean,
  page: number,
  loading: boolean
] => {
  const [page, setPage] = React.useState<number>(0);
  const [teamBoarList, hasMoreContent, loading] = useGetBoardList({
    page,
    category: 2,
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
    teamBoarList,
    increasePage,
    decreasePage,
    resetPage,
    hasMoreContent,
    page,
    loading,
  ];
};

export default useTeamBoardList;
