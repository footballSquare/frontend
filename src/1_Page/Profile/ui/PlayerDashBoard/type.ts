import { UserInfo } from "../../../../3_Entity/Account/type";

export type UserInfoProps = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "mmr"
>;

export type UserInfoInput = {
  nickname: string;
  platform: string;
  team: string;
  position: string;
  state_message: string;
  common_status_idx: number;
  tag_discord: string;
};
