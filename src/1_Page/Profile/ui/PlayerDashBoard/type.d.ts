import { UserInfo } from "../../../../3_Entity/Account/types/response";

export type PlayerDashBoardProps = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "mmr"
>;

export type UserInfoForm = {
  nickname: string;
  platform: string;
  team: string;
  position: string;
  state_message: string;
  common_status_idx: string;
  tag_discord: string;
};
