export const convertToPutData = (data: TeamInfoForm): UsePutTeamInfoProps => {
  const {
    common_status_idx,
    team_repeat_checked,
    short_team_repeat_checked,
    ...rest
  } = data;
  console.log(team_repeat_checked, short_team_repeat_checked);
  return { common_status_idx: Number(common_status_idx), ...rest };
};

export const convertToTeamInfoForm = (data: TeamInfo): TeamInfoForm => ({
  ...data,
  common_status_idx: data.common_status_idx?.toString(),
  team_repeat_checked: false,
  short_team_repeat_checked: false,
});
