type SelectableTeamCardProps = {
  teamInfo: CommunityTeam;
  onClickEvent?: (teamIdx: number) => void;
  observeRef?: (node?: Element | null) => void;
};
