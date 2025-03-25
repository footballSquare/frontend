type MatchLineupProps = {
  matchIdx: number;
  selectTeamScore: number[];
  selectTeamList: string[];
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
