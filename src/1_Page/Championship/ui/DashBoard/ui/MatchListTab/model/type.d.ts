type UseSearchTeamHandlerReturn = {
  searchTerm: string;
  myMatchList: ChampionshipMatchList[];
  filteredMatches: ChampionshipMatchList[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type useSortHandlerProps = ChampionshipMatchList[];
