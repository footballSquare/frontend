type MatchListContainerProps = {
  refetch: () => void;
  matchList: ChampionshipMatchList[];
  teamList: ChampionshipTeamInfo[];
};

type SelectMatchTeamInfo = {
  teamName: string;
  teamScore: number;
};
