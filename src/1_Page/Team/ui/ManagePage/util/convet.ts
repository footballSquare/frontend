import { TeamPutInfo } from "../../../../../3_Entity/Team/type";
import { TeamInfoInput, TextInputFormProps } from "../ui/TextInputForm/type";

export const convertToPutData = (data: TeamInfoInput): TeamPutInfo => {
  const {
    common_status_idx,
    team_repeat_checked,
    short_team_repeat_checked,
    ...rest
  } = data;
  console.log(team_repeat_checked, short_team_repeat_checked);
  return { common_status_idx: Number(common_status_idx), ...rest };
};

export const convertToTeamInfo = (data: TextInputFormProps): TeamInfoInput => ({
  ...data,
  common_status_idx: data.common_status_idx.toString(),
  team_repeat_checked: false,
  short_team_repeat_checked: false,
});
