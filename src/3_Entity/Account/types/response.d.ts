type Awards = {
  championship_list_throphy_img: string;
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
};

type Platform = "pc" | "xbox" | "playstation" | null;

type UserInfo = {
  // 본인확인
  is_mine: boolean;
  // idx
  user_idx: number;
  team_idx: number;
  // 유저 데이터
  nickname: string;
  profile_image: string | null;
  platform: Platform;
  discord_tag: string;
  player_status: "pending" | "active" | "deleted";
  state_message: string;
  position: number;
  // 팀데이터
  team_name: string | null;
  short_team_name: string | null;
  team_emblem: string | null;
  // 구직상태
  common_status_idx: number;
  // 유저 스펙
  match_count: number;
  winning_rate: number;
  trophies: Awards[] | null;
  mmr: number;
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
