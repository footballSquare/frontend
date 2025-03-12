export type TextInputFormProps = {
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_announcement: string;
  team_list_idx: number;
  common_status_idx: number;
};

export type TeamInfoInput = Omit<
  TextInputFormProps,
  "team_list_idx" | "common_status_idx"
> & {
  common_status_idx: string;
  team_repeat_checked: boolean;
  short_team_repeat_checked: boolean;
};
