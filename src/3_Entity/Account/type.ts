import { TeamAwards } from "../Team/type";

export type UserInfo = {
  is_mine: boolean;
  is_hire: boolean;
  user_idx: number;
  profile_img: string;
  nickname: string;
  state_message: string;
  platform: number;
  team: string;
  position: number;
  tag_discord: string;
  mmr: number;
  match_count: number;
  winning_rate: number;
  trophies: TeamAwards[];
};

export type UserInfoPost = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "isMine" | "userIdx"
>;

export type UserInfoInput = Omit<UserInfoPost, "platform" | "position"> & {
  platform: string;
  position: string;
};
