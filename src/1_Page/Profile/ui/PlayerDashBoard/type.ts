import { UserInfo } from "../../../../3_Entity/Account/type";

export type UserInfoProps = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "mmr"
>;

export type UserInfoInput = Omit<UserInfoProps, "platform" | "position"> & {
  nickname: string;
  platform: string;
  team: string;
  position: string;
};
