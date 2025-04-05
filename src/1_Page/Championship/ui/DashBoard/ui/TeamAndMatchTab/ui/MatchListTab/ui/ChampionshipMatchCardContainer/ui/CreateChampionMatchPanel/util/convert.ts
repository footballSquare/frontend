export const convertCreateChampionMatchForm = (
  data: CreateChampionMatchFormValues
): UsePostCreateChampionshipMatchProps => {
  return {
    first_team_idx: data.teams[0],
    second_team_idx: data.teams[1],
    match_match_start_time: `${data.matchDate} ${data.startTime}:00`,
  };
};
