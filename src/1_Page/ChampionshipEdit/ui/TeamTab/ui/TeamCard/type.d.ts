type TeamCardProps = {
  teamInfo: CommunityTeam;
  handleTeamClick: (teamIdx: number) => void;
  observeRef?: (node?: Element | null) => void;
};
