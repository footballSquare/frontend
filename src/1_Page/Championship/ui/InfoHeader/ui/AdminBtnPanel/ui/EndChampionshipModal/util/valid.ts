export const isInvalidEnd = (props: IsVlaidEndProps): boolean => {
  const { selectTeam, selectedAwardPlayers } = props;
  const teamIdx = selectTeam?.team_list_idx;
  const allAwardsSelected = selectedAwardPlayers.every(
    (player) => player !== null
  );
  return !teamIdx || !allAwardsSelected;
};
