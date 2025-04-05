import React from "react";
import useGetStandbyList from "../../3_Entity/Match/useGetStandbyList";
import StandbyPlayerCard from "./ui/StandbyPlayerCard";
import useInfiniteScrollPaging from "../../4_Shared/model/useInfiniteScrollPaging";

const WaitingPlayerList = () => {
  const [page, setPage] = React.useState<number>(1);
  const [standbyList, hasMoreContent, loading] = useGetStandbyList({page});
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="flex flex-col overflow-y-auto h-full w-full">
      {standbyList.map((elem, index) => {
        return (
          <StandbyPlayerCard
            {...elem}
            observeRef={
              (standbyList.length === index + 1 && observeRef) ||
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
