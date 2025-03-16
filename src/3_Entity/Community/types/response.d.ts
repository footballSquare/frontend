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
  player_list_platform: number;
  player_list_profile_img: string;
  player_list_nickname: string;
  community_role_idx: number;
};

type CommunityTeam = {
  team_list_idx: number;
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_emblem: string;
};
