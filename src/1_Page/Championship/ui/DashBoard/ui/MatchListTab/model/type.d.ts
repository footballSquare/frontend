type UseSearchTeamHandlerReturn = {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  availableDates: Date[];
  selectedDate: Date;
  selectedDateMatches: ExpandedMatchList[];
  handleSetSelectedDate: (date: Date) => void;
};

type ExpandedMatchList = ChampionshipMatchList & { isMyTeamMatch: boolean };

type useSortHandlerProps = ChampionshipMatchList[];

type UseManageChampionshipDetailReturn = {
  displayMatchDetail: ChampionshipMatchDetail;
  handleUpdateTeamStats: (teamIdx: number, formData: PostTeamStatsForm) => void;
};
