type UseSearchTeamHandlerReturn = {
  searchTerm: string;
  myMatchList: ChampionshipMatchList[];
  filteredMatches: ChampionshipMatchList[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type useSortHandlerProps = ChampionshipMatchList[];

type UseManageChampionshipDetailReturn = {
  displayMatchDetail: ChampionshipMatchDetail;
  handleUpdateTeamStats: (teamIdx: number, formData: PostTeamStatsForm) => void;
};
type UseDateIndexReturn = {
  availableDates: Date[];
  selectedDate: Date;
  selectedDateMatches: ChampionshipMatchList[];
  handleSetSelectedDate: (date: Date) => void;
};
