import useGetChampionshipList from "../../../../3_Entity/Community/useGetChampionshipList";
import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import { useNavigate } from "react-router-dom";
import PAGE_URI from "../../../../4_Shared/constant/pageUri";
import { utcFormatter } from "../../../../4_Shared/lib/utcFormatter";

const ChampionshipList = (props: ChampionshipListProps) => {
  const { communityIdx } = props;
  const [page, setPage] = React.useState<number>(0);
  const [championshipList, hasMoreContent, loading] = useGetChampionshipList({
    communityIdx,
    page,
  });
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );
  const navigate = useNavigate();

  return (
    <div className="rounded-xl shadow-md w-full flex flex-col gap-2 p-2 overflow-auto h-[100%] text-gray">
      {championshipList.map((elem, index) => {
        return (
          <div
            onClick={() => {
              navigate(
                `${PAGE_URI.CHAMPIONSHIP}/${elem.championship_list_idx}`
              );
            }}
            key={index}
            className="border flex flex-col gap-2 justify-center border-gray shadow-md rounded-lg p-2 cursor-pointer hover:bg-grass hover:text-black transition-all duration-300"
            ref={championshipList.length === index + 1 ? observeRef : undefined}
          >
            <h3 className="text-lg font-semibold">
              {elem.championship_list_name}
            </h3>
            <img
              src={elem.championship_list_throphy_img}
              className="w-12 h-12 border border-gray rounded-lg"
              alt="throphy"
            />
            <div className="text-sm">
              {elem.championship_type_name}{" "}
              {`${utcFormatter(
                elem.championship_list_start_date
              )} ~ ${utcFormatter(elem.championship_list_end_date)}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChampionshipList;
