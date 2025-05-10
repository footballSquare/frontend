import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useGetCommunityBoardList from "../../../../3_Entity/Community/useGetCommunityBoardList";
import { utcFormatter } from "../../../../4_Shared/lib/utcFormatter";

const CommunityBoardList = (props: ChampionshipListProps) => {
  const { communityIdx } = props;
  const [page, setPage] = React.useState<number>(0);
  const [communityBoardList, hasMoreContent, loading] =
    useGetCommunityBoardList({
      communityIdx,
      page,
    });
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="rounded-xl shadow-lg w-full flex flex-col gap-4 p-4 overflow-auto h-[100%] text-gray-800">
      {communityBoardList.map((elem, index) => {
        return (
          <div
            key={index}
            className="border flex flex-col md:flex-row gap-4 justify-between border-gray-300 shadow-lg rounded-xl p-4 cursor-pointer bg-gradient-to-b from-blue-50 to-gray hover:scale-105 hover:shadow-xl transition-all duration-300"
            ref={
              communityBoardList.length === index + 1 ? observeRef : undefined
            }
          >
            {/* 미리보기 이미지 */}
            <div className="flex-shrink-0 w-20 h-12 items-center justify-center"> 
              {elem.board_list_img[0] && (
                <img
                  src={elem.board_list_img[0]}
                  className="w-full h-full object-cover border border-gray-300 rounded-lg shadow-md"
                  alt="미리보기"
                />
              )}
            </div>

            {/* 게시글 정보 */}
            <div className="flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {elem.board_list_title}
              </h3>
              <div className="text-xs text-gray-500 flex justify-between">
                <span className="font-medium">작성자: {elem.player_list_nickname}</span>
                <span>{utcFormatter(elem.board_list_updated_at)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityBoardList;
