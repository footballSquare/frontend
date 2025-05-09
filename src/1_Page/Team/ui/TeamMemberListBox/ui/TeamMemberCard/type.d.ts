type TeamMemberCardProps = TeamMembers & {
  handleChangeTeamRole: (memberIdx: number, roleIdx: number) => void;
  handleDelete: (memberIdx: number) => void;
  observeRef?: (node?: Element | null) => void;
  isTeamReader: boolean;
  isMine: boolean;
};
