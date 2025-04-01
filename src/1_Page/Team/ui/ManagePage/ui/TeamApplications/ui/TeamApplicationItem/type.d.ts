type TeamApplicationItemProps = {
  player: TeamSignMember;
  postApproveMember: (playerId: number) => void;
  deleteApproveMember: (playerId: number) => void;
  addDisplayPlayer: (playerId: number) => void;
};
