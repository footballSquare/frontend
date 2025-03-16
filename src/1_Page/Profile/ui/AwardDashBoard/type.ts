import { UserInfo } from "../../../../3_Entity/Account/types/response";

export type AwardDashBoardProps = Pick<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "mmr"
>;
