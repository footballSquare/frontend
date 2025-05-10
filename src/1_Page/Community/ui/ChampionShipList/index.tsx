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
    <div className="rounded-xl shadow-lg w-full flex flex-col gap-4 p-4 overflow-auto h-[100%] text-gray">
      {championshipList.map((elem, index) => {
        return (
          <div
            key={index}
            ref={championshipList.length === index + 1 ? observeRef : undefined}
            onClick={() => {
              navigate(
                `${PAGE_URI.CHAMPIONSHIP}/${elem.championship_list_idx}`
              );
            }}
            className={`w-full bg-gray-800 shadow-md mb-3 transition-all rounded-r cursor-pointer hover:bg-gray-900`}
          >
            <div className="p-4 flex flex-col md:flex-row">
              {/* 왼쪽: 트로피 이미지 */}
              <div className="flex flex-col justify-center items-center md:items-start mb-2 md:mb-0 md:pr-3 border-r border-gray-700">
                {elem.championship_list_throphy_img && (
                  <img
                    src={elem.championship_list_throphy_img}
                    alt="트로피"
                    className="w-16 h-16 object-cover rounded-full border shadow-md"
                  />
                )}
              </div>

              {/* 중앙: 대회 이름 및 타입 */}
              <div className="flex justify-center items-center w-full flex-col px-3">
                <div className="font-bold text-gray-200 text-lg">
                  {elem.championship_list_name}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {elem.championship_type_name}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {`${utcFormatter(
                    elem.championship_list_start_date
                  )} ~ ${utcFormatter(elem.championship_list_end_date)}`}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChampionshipList;
