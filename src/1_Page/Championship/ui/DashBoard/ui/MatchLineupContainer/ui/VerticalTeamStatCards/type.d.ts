type TeamData = {
  teamListIdx: number;
  name: string;
  stats: TeamStats;
  players?: PlayerStats[];
  evidenceImage?: TeamEvidenceImg[];
  matchIdx: number;
};

type VerticalTeamStatCardsProps = {
  firstTeam: TeamData;
  secondTeam: TeamData;
};
