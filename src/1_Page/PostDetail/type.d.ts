type BoardApiResponse = {
  board: {
    board: BoardEntity;
  };
};

// 실제 게시글(보드) 데이터
type BoardEntity = {
  player: Player;
  comments: Comment[];
  board_list_idx: number;
  board_list_img: string[];
  board_list_title: string;
  board_category_idx: number;
  board_list_content: string;
  board_list_likecount: number;
  board_list_created_at: string;
  board_list_updated_at: string;
  board_list_view_count: number;
};

// 작성자 정보
type Player = {
  player_list_idx: number;
  player_list_nickname: string;
  player_list_profile_image: string | null;
};

// 댓글 정보
type Comment = {
  player_list_idx: number;
  board_comment_idx: number;
  player_list_nickname: string;
  board_comment_content: string;
  board_comment_updated_at: string;
  board_comment_created_at: string;
  player_list_profile_image: string | null;
};
