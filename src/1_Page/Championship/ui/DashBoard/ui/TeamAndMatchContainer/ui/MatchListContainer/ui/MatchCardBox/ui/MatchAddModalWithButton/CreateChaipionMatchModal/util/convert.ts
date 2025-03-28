export const convertCreateChampionMatchForm = (
  data: CreateChampionMatchFormValues
) => {
  return {
    first_team_idx: data.teams[0].team_list_idx,
    second_team_idx: data.teams[1].team_list_idx,
    match_match_start_time: `${data.matchDate}T${data.match_start_time}:00`,
  };
};
