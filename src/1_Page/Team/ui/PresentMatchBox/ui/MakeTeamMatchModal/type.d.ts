import { TeamInfo } from "../../../../../../3_Entity/Team/types/response";

export type MakeTeamMatchModalProps = Pick<TeamInfo, "team_list_idx"> & {
  onClose: () => void;
  refetch: () => void;
};

export type MatchDataForm = {
  match_match_start_date: string;
  match_match_start_time: string;
  match_match_start_hour: string;
  match_match_start_min: string;
  match_match_attribute: number;
  match_type_idx_radio: string;
  match_match_participation_type_radio: string;
  match_match_duration: string;
  match_formation_idx: number;
};
