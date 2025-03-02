import { UserInfo } from "../../../../3_Entity/Account/type";

export type UserInfoProps = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "isMine"
>;

export type UserInfoInput = Omit<UserInfoProps, "platform" | "position"> & {
  platform: string;
  position: string;
};
