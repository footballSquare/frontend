type Awards = {
  championship_list_throphy_img: string;
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
};

export type UserInfo = {
  is_mine: boolean;
  user_idx: number;
  profile_img: string;
  short_team_name: string;
  nickname: string;
  state_message: string;
  platform: number;
  team: string;
  team_emblem: string;
  common_status_idx: number;
  position: number;
  tag_discord: string;
  mmr: number;
  match_count: number;
  winning_rate: number;
  trophies: Awards[];
};

type SignInData = {
  player_status: string;
  access_token: string;
  user_idx: number;
  profile_image: string | null;
  team_idx: number | null;
  team_role_idx: number | null;
  community_role_idx: number | null;
};
