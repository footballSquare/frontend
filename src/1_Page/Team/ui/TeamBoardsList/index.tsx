import React from "react";
import useGetBoardList from "../../../../3_Entity/Board/useGetBoardList";
import useInfiniteScrollPaging from "../../../../4_Shared/model/useInfiniteScrollPaging";
import { formatDateKoreanDate } from "../../../../4_Shared/lib/dateFormatter";
import likeIcon from "../../../../4_Shared/assets/svg/likeFill.svg";
import { useNavigate } from "react-router-dom";
import useTeamInfoContext from "../../../../4_Shared/model/useTeamInfoContext";
import { getTextColorFromBackground } from "../../../../4_Shared/lib/colorChecker";

const TeamBoardsList = () => {
  const [page, setPage] = React.useState<number>(0);
  const [boardList, hasMoreContent, loading] = useGetBoardList({
    category: 2,
    page,
  });
  const navigate = useNavigate();
  const { teamListColor } = useTeamInfoContext();
  const teamTextColor = getTextColorFromBackground(teamListColor);

  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">팀 게시글</h2>
        <button
          onClick={() => navigate("/post/write/new/team")}
          className="px-3 py-1 text-sm rounded-lg transition-colors hover:opacity-80"
          style={{
            backgroundColor: teamListColor,
            color: teamTextColor,
          }}>
          글쓰기
        </button>
      </div>

      <div className="flex flex-col space-y-2 overflow-y-auto max-h-[600px]">
        {boardList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-sm">
              아직 작성된 게시글이 없습니다.
            </div>
          </div>
        ) : (
          boardList.map((board, index) => (
            <div
              key={board.board_list_idx}
              ref={boardList.length === index + 1 ? observeRef : undefined}
              onClick={() => navigate(`/post/${board.board_list_idx}`)}
              className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer flex items-center gap-3">
              {/* 게시글 이미지 (있는 경우만) */}
              {board.board_list_img && board.board_list_img.length > 0 && (
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <img
                    src={board.board_list_img[0]}
                    alt={board.board_list_title}
                    className="w-full h-full object-cover"
                  />
                  {board.board_list_img.length > 1 && (
                    <div className="absolute top-0 right-0 bg-black/70 text-white text-xs px-1 rounded-bl">
                      +{board.board_list_img.length - 1}
                    </div>
                  )}
                </div>
              )}

              {/* 게시글 내용 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
                  {board.board_list_title}
                </h3>

                {/* 작성자 및 정보 */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>{board.player_list_nickname}</span>
                    <span>•</span>
                    <span>
                      {formatDateKoreanDate(
                        new Date(board.board_list_created_at)
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👁 {board.board_list_view_count}</span>
                    <div className="flex items-center gap-1">
                      <img src={likeIcon} className="w-4 h-4" />
                      <span>{board.board_list_likecount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default TeamBoardsList;
