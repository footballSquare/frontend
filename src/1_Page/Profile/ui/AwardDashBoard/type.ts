import { UserInfo } from "../../../../3_Entity/Account/type";

export type UserInfoStats = Pick<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "mmr"
>;
