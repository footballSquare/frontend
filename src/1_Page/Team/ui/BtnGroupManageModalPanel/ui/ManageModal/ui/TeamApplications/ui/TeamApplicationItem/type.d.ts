type TeamApplicationItemProps = {
  player: TeamSignMember;
  team_list_idx: number;
  excludePlayerById: (playerId: number) => void;
};
