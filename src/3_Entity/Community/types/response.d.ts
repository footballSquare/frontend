type Community = {
  community_list_idx: number;
  community_list_name: string;
  community_list_notice: string;
  community_list_banner: string;
  community_list_emblem: string;
};

type Championship = {
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_throphy_img: string;
  championship_list_color: string;
  championship_type_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
};

type CommunityStaff = {
  player_list_idx: number;
  player_list_nickname: string;
  player_list_platform: string | null;
  player_list_profile_img: string | null;
  community_role_idx: number;
  community_staff_joined_at: string;
};

type CommunityTeam = {
  team_list_idx: number;
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_emblem: string | null;
};

type CommunityStaffApplication = {
  player_list_idx: number;
  player_list_nickname: string;
  player_list_platform: string | null;
  player_list_profile_img: string | null;
};

type CommunityBoard = {
  board_list_idx: number;
  board_category_idx: number;
  board_list_title: string;
  player_list_idx: number;
  board_list_img: string[];
  board_list_created_at: string;
  board_list_updated_at: string;
  board_list_likecount: number;
  board_list_view_count: number;
  community_list_idx: number;
  player_list_nickname: string;
  player_list_profile_image: string | null;
};
