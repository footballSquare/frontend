type UseSortHandlerReturn = {
  searchTerm: string;
  sortOption: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortedMatches: ChampionshipMatchList[];
};

type useSortHandlerProps = ChampionshipMatchList[];
