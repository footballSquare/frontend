import { TeamAwards } from "../Team/type";

export type UserInfo = {
  isMine: boolean;
  name: string;
  nickname: string;
  platform: number;
  team: string;
  position: number;
  tag_discord: string;
  tag: string;
  mmr: number;
  phone_number: string;
  match_count: number;
  winning_rate: number;
  trophies: TeamAwards[];
  profile_img: string;
};

export type UserInfoPost = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "isMine"
>;

export type UserInfoInput = Omit<UserInfoPost, "platform" | "position"> & {
  platform: string;
  position: string;
};
