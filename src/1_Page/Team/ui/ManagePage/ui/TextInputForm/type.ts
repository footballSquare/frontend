export type TextInputFormProps = {
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_announcement: string;
};

export type TeamInfoInput = TextInputFormProps & {
  team_repeat_checked: boolean;
  short_team_repeat_checked: boolean;
};
