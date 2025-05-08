type MatchLineupContainerProps = {
  matchIdx: number;
  selectedTeams: SelectTeamMatchInfo;
  championshipDetail: ChampionshipMatchDetail;
};

type AssignFormation = {
  nickname: string;
  position: string;
  top: string;
  left: string;
};
type MatchFormationResult = {
  assignedFirst: AssignFormation[];
  assignedSecond: AssignFormation[];
};

type TeamStatKey = {
  label: string;
  key: keyof TeamStats;
};
