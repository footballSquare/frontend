type UseSearchTeamHandlerReturn = {
  searchTerm: string;
  filteredMatches: ChampionshipMatchList[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type useSortHandlerProps = ChampionshipMatchList[];
