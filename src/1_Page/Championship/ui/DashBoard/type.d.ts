type DashBoardProps = {
  championship_type_idx: number;
};

type TournamentData = {
  round: number;
  label: string;
  matchList: ChampionshipMatchList[];
};

type LeagueData = {
  team_list_idx: number;
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_emblem: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

type SelectTeamMatchInfo = {
  selectTeamList: string[];
  selectTeamScore: number[];
};
