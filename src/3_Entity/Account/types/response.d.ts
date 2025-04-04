type Awards = {
  championship_list_throphy_img: string;
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
};

type UserInfo = {
  user_idx: number;
  nickname: string;
  team_idx: number;
  profile_image: string | null;
  platform: "pc" | "xbox" | "playstation";
  state: number;
  message: string;
  discord_tag: string;
  MMR: number;
  player_status: "pending" | "active" | "deleted";
  is_mine: boolean;
  // 첫 번째 타입에만 존재하는 속성 추가
  short_team_name: string;
  state_message: string;
  team: string;
  team_emblem: string;
  common_status_idx: number;
  position: number;
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

type DiscordOAuthUrl = {
  url: string;
};
