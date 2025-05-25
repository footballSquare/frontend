type TeamApplicationItemProps = {
  player: TeamSignMember;
  team_list_idx: number;
  includePayerById: (playerId: number) => void;
  excludePlayerById: (playerId: number) => void;
};
