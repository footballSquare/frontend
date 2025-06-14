type TeamCreateFormValues = {
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_announcement: string;
  common_status_idx: number;
};

type PostMakeTeamInputProps = {
  registerType:
    | "team_list_name"
    | "team_list_short_name"
    | "team_list_color"
    | "common_status_idx"
    | "team_list_announcement";

  repeatType?: "team_list_name_repeat" | "team_list_short_name_repeat";
};
