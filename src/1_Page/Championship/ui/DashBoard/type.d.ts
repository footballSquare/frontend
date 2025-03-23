type DashBoardProps = {
  championshipIdx: number;
  isLeague: boolean;
};

type TournamentData = {
  round: number;
  label: string;
  matches: ChampionshipMatchList[];
};
