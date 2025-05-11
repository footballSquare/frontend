type Board = {
  board_list_idx: number;
  board_list_title: string;
  player_list_idx: number;
  player_list_img: string;
  board_list_updated_at: string;
  board_list_likecount: number;
};

type BoardDetailsResponse = {
  board: {
    board: BoardDetails;
  };
};
type BoardPlayer = {
  player_list_idx: number;
  player_list_nickname: string;
  player_list_profile_image: string | null;
};

type BoardComment = {
  player_list_idx: number;
  board_comment_idx: number;
  player_list_nickname: string;
  board_comment_content: string;
  board_comment_created_at: string;
  board_comment_updated_at: string;
  player_list_profile_image: string | null;
};

type BoardDetails = {
  player: BoardPlayer;
  comments: BoardComment[];
  board_list_idx: number;
  board_list_img: string[];
  board_list_title: string;
  board_category_idx: number;
  community_list_idx: number | null;
  board_list_content: string;
  board_list_likecount: number;
  board_list_created_at: string;
  board_list_updated_at: string;
  board_list_view_count: number;
};

type BoardLike = {
  board_list_idx: number;
  player_list_idx: number;
};
