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
  is_mine: boolean;
  user_idx: number;
  Awards: Awards[];
  discord_tag: string | null;
  message: string | null;
  mmr: number;
  nickname: string;
  platform: "pc" | "xbox" | "playstation" | null;
  player_status: "pending" | "active" | "deleted";
  common_status_idx: number;
  profile_image: string | null;
  team_color: string;
  team_emblem: string | null;
  team_idx: number | null;
  team_name: string | null;
  team_short_name: string | null;
  position: number;
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
