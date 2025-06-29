import dateFormatter from "./lib/dateFormatter";
import useBoardCategory from "./model/useBoardCategory";
import useCommunityBoardList from "./model/useCommunityBoardList";
import useFreeBoardList from "./model/useFreeBoardList";
import useTeamBoardList from "./model/useTeamBoardList";
import { useNavigate } from "react-router-dom";

const Boards = () => {
  const navigate = useNavigate();
  const [boardCategory, setBoardCategory] = useBoardCategory();

  // 0: Free
  // 1: Community
  // 2: Team
  const [
    freeBoardList,
    increaseFreeBoardPage,
    decreaseFreeBoardPage,
    resetFreeBoardPage,
    hasMoreFreeBoardContent,
    freePage,
    freeBoardLoading,
  ] = useFreeBoardList();
  const [
    communityBoardList,
    increaseCommunityBoardPage,
    decreaseCommunityBoardPage,
    resetCommunityBoardPage,
    hasMoreCommunityBoardContent,
    communityPage,
    communityBoardLoading,
  ] = useCommunityBoardList();
  const [
    teamBoardList,
    increaseTeamBoardPage,
    decreaseTeamBoardPage,
    resetTeamBoardPage,
    hasMoreTeamBoardContent,
    teamPage,
    teamBoardLoading,
  ] = useTeamBoardList();
  // 카테고리별 게시판 목록과 페이지 정보
  // 각 카테고리의 게시판 목록과 페이지 정보는 useFreeBoardList, useCommunityBoardList, useTeamBoardList 훅에서 가져옵니다.
  const categories = [
    {
      id: 0,
      name: "Free Board",
      description: "자유롭게 소통해보세요!",
      boardList: freeBoardList,
      hasMore: hasMoreFreeBoardContent,
      loading: freeBoardLoading,
      increase: increaseFreeBoardPage,
      decrease: decreaseFreeBoardPage,
      reset: resetFreeBoardPage,
      page: freePage,
    },
    {
      id: 1,
      name: "Community",
      description: "커뮤니티 별 소식을 확인해보세요!",
      boardList: communityBoardList,
      hasMore: hasMoreCommunityBoardContent,
      loading: communityBoardLoading,
      increase: increaseCommunityBoardPage,
      decrease: decreaseCommunityBoardPage,
      reset: resetCommunityBoardPage,
      page: communityPage,
    },
    {
      id: 2,
      name: "Team Board",
      description: "모든 팀의 소식을 확인해보세요!",
      boardList: teamBoardList,
      hasMore: hasMoreTeamBoardContent,
      loading: teamBoardLoading,
      increase: increaseTeamBoardPage,
      decrease: decreaseTeamBoardPage,
      reset: resetTeamBoardPage,
      page: teamPage,
    },
  ];
  // 현재 선택된 카테고리 정보
  const currentCategory = categories.find((cat) => cat.id === boardCategory)!;

  return (
    <div className="min-h-screen p-6 w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Today Topics!</h1>
        <p className="text-gray-300">다양한 주제로 소통해보세요</p>
      </div>
      {/* Category Tabs */}
      <div className="flex justify-center mb-8 w-fit mx-auto gap-2 bg-gray-800/50 rounded-2xl p-2 border border-gray-700/50">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setBoardCategory({ category: category.id as 0 | 1 | 2 });
            }}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              boardCategory === category.id
                ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <div className="font-semibold text-center">{category.name}</div>
          </button>
        ))}
      </div>
      {/* Board Content */}
      <div className="w-full border bg-gray-800/30 rounded-2xl border-gray-700/50">
        {/* Board Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-4">
            {/* 카테고리 정보 & 설명 */}
            <div className="flex flex-col gap-1 justify-center">
              <h2 className="text-2xl font-bold text-white">
                {currentCategory.name}
              </h2>
              <p className="text-gray-300 text-sm">
                {currentCategory.description}
              </p>
            </div>
            {/* 새글 작성 버튼 */}
            {currentCategory.id === 0 && (
              <button
                onClick={() => {
                  navigate("/post/write/new/free");
                }}
                className="p-2 h-[36px] bg-gradient-to-r from-gray-500 to-gray-800 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-semibold"
              >
                새 글 작성하기
              </button>
            )}
          </div>
          <div className="text-gray-400">Page {currentCategory.page + 1}</div>
        </div>
        {/* Board List */}
        <div className="p-6 w-full">
          {currentCategory.loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
            </div>
          ) : currentCategory.boardList.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">📝</div>
              <p className="text-gray-400">게시글이 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 w-full justify-center">
              {currentCategory.boardList.map((board) => (
                <div
                  key={board.board_list_idx}
                  onClick={() => navigate(`/post/${board.board_list_idx}`)}
                  className="min-w-[47%] bg-gray-700/30 rounded-xl p-4 border border-gray-600/50 hover:bg-gray-600/30 hover:border-gray-500/50 cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold group-hover:text-gray-200 transition-colors duration-200 mb-2">
                        {board.board_list_title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          {board.player_list_profile_image ? (
                            <img
                              src={board.player_list_profile_image}
                              alt={board.player_list_nickname}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                              {board.player_list_nickname
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}
                          <span>{board.player_list_nickname}</span>
                        </div>
                        <span>
                          {dateFormatter(board.board_list_created_at)}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            ❤️ {board.board_list_likecount}
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {board.board_list_view_count}
                          </span>
                        </div>
                      </div>
                    </div>
                    {board.board_list_img &&
                      board.board_list_img.length > 0 &&
                      board.board_list_img[0] !== null && (
                        <div className="ml-4">
                          <img
                            src={board.board_list_img[0]}
                            alt="게시글 이미지"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>{" "}
        {/* Pagination btns */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => currentCategory.decrease()}
              disabled={currentCategory.page === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentCategory.page === 0
                  ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              ← 이전
            </button>

            <div className="flex items-center gap-2 text-gray-300">
              <span>Page {currentCategory.page + 1}</span>
              {!currentCategory.hasMore && (
                <span className="text-gray-500">• 마지막 페이지</span>
              )}
            </div>

            <button
              onClick={() => {
                if (currentCategory.hasMore) {
                  currentCategory.increase();
                } else {
                  alert("마지막 페이지입니다.");
                }
              }}
              className="px-6 py-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200"
            >
              다음 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
