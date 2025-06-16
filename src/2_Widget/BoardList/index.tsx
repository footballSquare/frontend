import useGetBoardList from "../../3_Entity/Board/useGetBoardList";
import React from "react";

const BoardList = (props: BoardListProps) => {
  const { category } = props;
  const [page, setPage] = React.useState<number>(1);
  const [boardList, hasMoreContent, loading] = useGetBoardList({
    category,
    page,
  });

  return (
    <div className="flex flex-col overflow-y-auto h-full w-full gap-4">
      {boardList.map((board, index) => {
        return (
          <div
            key={index}
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
