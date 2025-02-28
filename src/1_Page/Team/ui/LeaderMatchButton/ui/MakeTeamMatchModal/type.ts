import { TeamInfo } from "../../../../../../3_Entity/Team/type";
import { MatchFormData } from "../../../../../../3_Entity/Match/type";

export type makeTeamMatchModalProps = Pick<TeamInfo, "team_list_idx"> & {
  onClose: () => void;
};

export type ExtendedMatchFormData = MatchFormData & {
  match_match_start_date: string;
  match_type_idx_radio: string;
  match_match_participation_type_radio: string;
};
