type MakeTeamMatchModalProps = Pick<TeamInfo, "team_list_idx"> & {
  onClose: () => void;
  refetch: () => void;
};

type MatchDataForm = {
  match_match_start_date: string;
  match_match_start_time: string;
  match_match_start_hour: string;
  match_match_start_min: string;
  match_type_idx_radio: string;
  match_match_participation_type_radio: string;
  match_match_duration: string;
  match_formation_idx: number;
  match_match_name: string;
};

type MatchDataFormWithIdx = MatchDataForm & {
  team_list_idx: number;
};
