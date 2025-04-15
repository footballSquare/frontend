type TeamMemberCardProps = TeamMembers & {
  index: number;
  handleDelete: (memberIdx: number) => void;
  observeRef?: (node?: Element | null) => void;
};
