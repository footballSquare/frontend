type MatchCardBoxProps = {
  matchList: ChampionshipMatchList[];
  selectedIdx: number;
  handleSelect: (idx: number) => void;
};
