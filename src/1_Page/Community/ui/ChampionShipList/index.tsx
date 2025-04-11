import useGetChampionshipList from "../../../../3_Entity/Community/useGetChampionshipList";
import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import { useNavigate } from "react-router-dom";
import PAGE_URI from "../../../../4_Shared/constant/pageUri";

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
    <div className="rounded-xl shadow-md w-full flex flex-col gap-2 p-2 overflow-auto h-[100%]">
      {championshipList.map((elem, index) => {
        return (
          <div
            onClick={() => {
              navigate(`${PAGE_URI.CHAMPIONSHIP}/${elem.championship_list_idx}`);
            }}
            key={index}
            className="border flex flex-col gap-2 justify-center border-gray-300 shadow-md rounded-lg p-2 cursor-pointer hover:bg-blue-100 transition-all duration-300"
            ref={championshipList.length === index + 1 ? observeRef : undefined}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {elem.championship_list_name}
            </h3>
            <img
              src={elem.championship_list_throphy_img}
              className="w-12 h-12 border border-gray-300 rounded-lg"
              alt="throphy"
            />
            <p className="text-sm text-gray-600">{elem.championship_type_name} {`${elem.championship_list_start_date} ~ ${elem.championship_list_end_date}`}</p>
            
          </div>
        );
      })}
    </div>
  );
};

export default ChampionshipList;
