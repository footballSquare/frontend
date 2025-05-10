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
    <div className="rounded-xl shadow-lg w-full flex flex-col gap-4 p-4 overflow-auto h-[100%] text-gray-800">
      {championshipList.map((elem, index) => {
        return (
          <div
            onClick={() => {
              navigate(
                `${PAGE_URI.CHAMPIONSHIP}/${elem.championship_list_idx}`
              );
            }}
            key={index}
            className="border flex flex-col gap-2 justify-center border-gray-300 shadow-lg rounded-xl p-4 cursor-pointer bg-gradient-to-b from-blue-50 to-gray hover:scale-105 hover:shadow-xl transition-all duration-300"
            ref={championshipList.length === index + 1 ? observeRef : undefined}
          >
            <div className="flex items-center gap-4">
              <img
                src={elem.championship_list_throphy_img}
                className="w-16 h-16 border border-gray-300 rounded-full shadow-md"
                alt="throphy"
              />
              <h3 className="text-xl font-bold">
                {elem.championship_list_name}
              </h3>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">
                {elem.championship_type_name}
              </span>{" "}
              <span>
                {`${utcFormatter(
                  elem.championship_list_start_date
                )} ~ ${utcFormatter(elem.championship_list_end_date)}`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChampionshipList;
