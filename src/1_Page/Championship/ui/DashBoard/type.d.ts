type DashBoardProps = {
  championshipIdx: number;
  championship_type: number;
};

type TournamentData = {
  round: number;
  label: string;
  matches: ChampionshipMatchList[];
};
