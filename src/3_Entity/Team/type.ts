export type TeamInfo = {
  community_list_idx: number;
  team_list_idx: number;
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_emblem: string;
  team_list_banner: string;
  team_list_announcement: string;
  team_list_created_at: string;
  whole_member: number;
};

export type TeamAwards = {
  championship_list_throphy_img: string;
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
};

export type TeamHistory = {
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
};

export type TeamMembers = {
  player_list_idx: number;
  player_list_platform: number;
  player_list_profile_img: string;
  player_list_nickname: string;
  team_role_idx: number;
};

export type TeamPutInfo = {
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_announcement: string;
  common_status_idx: number;
};

export type SignTeamMember = {
  player_list_idx: number;
  player_list_platform: string;
  player_list_profile_img: string;
  player_list_nickname: string;
};
