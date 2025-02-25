import React from "react";
import useGetWaitingPlayerList from "../../3_Entity/Match/useGetWaitingPlayerList";
import WaitingPlayerCard from "./ui/WaitingPlayerCard";
import useInfiniteScrollPaging from "../../4_Shared/model/useInfiniteScrollPaging";

const WaitingPlayerList = () => {
  const [page, setPage] = React.useState<number>(1);
  const [waitingPlayerList, hasMoreContent, loading] =
    useGetWaitingPlayerList(page);
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="flex flex-col overflow-y-auto h-full w-full">
      {waitingPlayerList.map((elem, index) => {
        return (
          <WaitingPlayerCard
            {...elem}
            observeRef={
              (waitingPlayerList.length === index + 1 && observeRef) ||
              undefined
            }
            key={index}
          />
        );
      })}
    </div>
  );
};

export default WaitingPlayerList;
