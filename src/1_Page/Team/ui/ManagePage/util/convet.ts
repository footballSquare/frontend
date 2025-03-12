import { TeamInfoInput } from "../ui/TextInputForm/type";
import { TextInputFormProps } from "../ui/TextInputForm/type";

export const convertToPutData = (data: TeamInfoInput) => {
  const {
    common_status_idx,
    team_repeat_checked,
    short_team_repeat_checked,
    ...rest
  } = data;
  console.log(team_repeat_checked, short_team_repeat_checked);
  return { common_status_idx: Number(common_status_idx), ...rest };
};

export const convertToTeamInfo = (props: TextInputFormProps) => ({
  ...props,
  common_status_idx: props.common_status_idx.toString(), // ✅ number → string 변환
  team_repeat_checked: false,
  short_team_repeat_checked: false,
});
