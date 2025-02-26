import { TeamInfo } from "../../../../3_Entity/Team/type";
import { MatchFormData } from "../../../../3_Entity/Match/type";

export type TeamListIdxProps = Pick<TeamInfo, "team_list_idx">;

export type ExtendedMatchFormData = MatchFormData & {
  match_match_start_date: string;
};
