type MatchCardBoxProps = {
  matchList: ChampionshipMatchList[];
  teamList: ChampionshipTeamInfo[];
  selectedIdx: number;
  handleSelect: (idx: number) => void;
};
