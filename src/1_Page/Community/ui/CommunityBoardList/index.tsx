import React from "react";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import useGetCommunityBoardList from "../../../../3_Entity/Community/useGetCommunityBoardList";
import { utcFormatter } from "../../../../4_Shared/lib/utcFormatter";
import { useNavigate } from "react-router-dom";
import PAGE_URI from "../../../../4_Shared/constant/pageUri";

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
  const navigate = useNavigate();

  return (
    <div className="rounded-xl shadow-lg w-full flex flex-wrap gap-4 p-4 overflow-auto text-gray bg-gray-700">
      {communityBoardList.map((elem, index) => {
        return (
          <div
            key={index}
            ref={
              communityBoardList.length === index + 1 ? observeRef : undefined
            }
            onClick={() => {
              navigate(`${PAGE_URI.POST}/${elem.board_list_idx}`);
            }}
            className={`w-full md:max-w-[32.5%] bg-gray-800 shadow-md transition-all rounded-r cursor-pointer hover:bg-gray-900`}
          >
            <div className="p-4 flex flex-col md:flex-row">
              {/* 왼쪽: 미리보기 이미지 */}
              <div className="flex-shrink-0 w-32 pr-2 items-center justify-center border-r border-gray-700">
                {/* {elem.board_list_img[0] && (
                  <img
                    src={elem.board_list_img[0]}
                    className="w-16 object-cover border border-gray-300 rounded-lg shadow-md"
                    alt="미리보기"
                  />
                )} */}
                <span className="text-sm text-gray-400 mt-1">
                  {utcFormatter(elem.board_list_updated_at)}
                </span>
              </div>

              {/* 중앙: 게시글 정보 */}
              <div className="flex justify-around items-center w-full flex-col px-3">
                <div className="font-bold text-gray-200 text-sm">
                  제목: {elem.board_list_title}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  작성자: {elem.player_list_nickname}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityBoardList;
