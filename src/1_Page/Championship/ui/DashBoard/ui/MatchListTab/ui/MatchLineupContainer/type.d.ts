type MatchLineupContainerProps = {
  championshipMatchIdx: number;
  selectedTeams: SelectTeamMatchInfo;
  championshipDetail: ChampionshipMatchDetail;
  matchIdx: number;
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
