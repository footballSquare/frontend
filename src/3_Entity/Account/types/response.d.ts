type Awards = {
  championship_list_throphy_img: string;
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
};

type Platform = "pc" | "xbox" | "playstation";

type UserInfo = {
  is_mine: boolean;
  user_idx: number;
  Awards: Awards[];
  discord_tag: string;
  message: string | null;
  mmr: number;
  nickname: string;
  platform: Platform;
  player_status: "pending" | "active" | "deleted";
  common_status_idx: number;
  profile_image: string | null;
  team_color: string;
  team_emblem: string | null;
  team_idx: number | null;
  team_name: string | null;
  team_short_name: string | null;
  match_position_idx: number;
};

type SignInData = {
  player_status: "pending" | "active" | "deleted";
  user_idx: number;
  access_token_temporary?: string;
  access_token?: string;
  nickname?: string;
  platform?: string;
  commmon_status_idx?: number;
  message?: string;
  discord_tag?: string;
  profile_image?: string | null;
  team_idx?: number | null;
  team_role_idx?: number | null;
  community_role_idx?: number | null;
  community_list_idx?: number | null;
};

type DiscordOAuthUrl = {
  url: string;
};

type MyInfo = {
  user_idx: number;
  phone: string;
  id: string;
  discord_id: string;
  nickname: string;
  profile_image: string | null;
  platform: string | null;
  common_status_idx: number;
  message: string | null;
  discord_tag: string | null;
  mmr: number;
  player_status: string;
  match_position_idx: number;
  team_idx: number | null;
  team_name: string | null;
  team_short_name: string | null;
  team_color: string | null;
  team_emblem: string | null;
  community_role_idx: number | null;
  community_list_idx: number | null;
  team_role_idx: number | null;
};
