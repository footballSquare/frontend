type Awards = {
  championship_list_throphy_img: string;
  championship_list_idx: number;
  championship_list_name: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
};

export type UserInfo = {
  isMine: boolean;
  userIdx: number;
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
  trophies: Awards[];
  profile_img: string;
};

export type UserInfoPost = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "isMine" | "userIdx"
>;

export type UserInfoInput = Omit<UserInfoPost, "platform" | "position"> & {
  platform: string;
  position: string;
};
