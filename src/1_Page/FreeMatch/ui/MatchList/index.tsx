import React from "react";
import MatchCard from "./ui/MatchCard";
import useGetOpenMatchList from "../../../../3_Entity/Match/useGetOpenMatchList";
import useInfiniteScrollPaging from "./model/useInfiniteScrollPaging";

const MatchList = () => {
  const [page, setPage] = React.useState<number>(1);
  console.log(page)
  const [openMatchList, hasMoreContent, loading] = useGetOpenMatchList(page);
  const [observeRef] = useInfiniteScrollPaging(setPage, loading, hasMoreContent);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-[70vh]">
      {openMatchList.map((elem, index) => {
        return <MatchCard {...elem} observeRef={openMatchList.length === index + 1 && observeRef || undefined} />;
      })}
    </div>
  );
};

export default MatchList;
