import useGetBoardList from "../../3_Entity/Board/useGetBoardList";
import React from "react";
import useInfiniteScrollPaging from "../../4_Shared/model/useInfiniteScrollPaging";

const BoardList = (props: BoardListProps) => {
  const { category } = props;
  const [page, setPage] = React.useState<number>(1);
  const [boardList, hasMoreContent, loading] = useGetBoardList({
    category,
    page,
  });
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="flex flex-col overflow-y-auto h-full w-full gap-4">
      {boardList.map((board, index) => {
        return (
          <div
            key={index}
            ref={(boardList.length === index + 1 && observeRef) || undefined}
            className=" p-2 border border-gray rounded-lg bg-white"
          >
            {board.board_list_title}
          </div>
        );
      })}
    </div>
  );
};

export default BoardList;
