type TextInputFormProps = {
  teamInfo: TeamInfo;
  team_list_idx: number;
  handleSetTeamInfoPreview: (data: TeamInfoForm) => void;
};
type TextInputFormProps = {
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_announcement: string;
  common_status_idx: number;
};

type TeamInfoForm = {
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_announcement: string;
  common_status_idx: string;
  team_repeat_checked: boolean;
  short_team_repeat_checked: boolean;
};
