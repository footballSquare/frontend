export const convertCreateChampionMatchForm = (
  data: CreateChampionMatchFormValues
) => {
  return {
    first_team_idx: data.teams[0],
    second_team_idx: data.teams[1],
    match_match_start_time: `${data.matchDate}T${data.startTime}:00`,
  };
};
