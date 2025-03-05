type TeamAwards = {
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
  trophies: TeamAwards[];
};

export type UserInfoPost = {
  nickname: string;
  platform: number;
  common_status_idx: number;
  position: number;
  state_message: string;
};
