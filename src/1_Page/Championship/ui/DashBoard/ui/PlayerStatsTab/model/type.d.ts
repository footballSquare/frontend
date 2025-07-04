type UseSearchHandlerReturn = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortConfig: {
    key: keyof PlayerStats;
    direction: "asc" | "desc";
  };
  handleSort: (key: keyof PlayerStats) => void;
  displayPlayerStats: PlayerStats[];
};
