import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useGetCommunityBoardList from "../../../../3_Entity/Community/useGetCommunityBoardList";
import { utcFormatter } from "../../../../4_Shared/lib/utcFormatter";

const CommunityBoardList = (props: ChampionshipListProps) => {
  const { communityIdx } = props;
  const [page, setPage] = React.useState<number>(0);
  const [communityBoardList, hasMoreContent, loading] = useGetCommunityBoardList({
    communityIdx,
    page,
  });
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );
  console.log(communityBoardList, "communityBoardList");

  return (
    <div className="rounded-xl shadow-md w-full flex flex-col gap-2 p-2 overflow-auto h-[100%]">
      {communityBoardList.map((elem, index) => {
        return (
          <div
            key={index}
            className="border flex flex-col gap-2 justify-center border-gray-300 shadow-md rounded-lg p-2 cursor-pointer hover:bg-blue-100 transition-all duration-300"
            ref={communityBoardList.length === index + 1 ? observeRef : undefined}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {elem.board_list_title}
            </h3>
            <img
              src={elem.board_list_img[0]}
              className="w-12 h-12 border border-gray-300 rounded-lg"
              alt="thumbnail"
            />
            <p className="text-sm text-gray-600">{elem.player_list_nickname} {`${utcFormatter(elem.board_list_updated_at)}`}</p>
            
          </div>
        );
      })}
    </div>
  );
};

export default CommunityBoardList;
