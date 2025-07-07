type useGetTeamInfoHandlerReturn = {
  displayTeamInfo: TeamInfo;
  loading: boolean;
  handlers: ManageHandlers;
};

type ManageHandlers = {
  handleSetTeamEmblem: (emblem: string | null) => void;
  handleSetTeamBanner: (banner: string | null) => void;
  handleSetTeamInfoWithoutImg: (data: TeamInfoForm) => void;
};

type TeamInfoContextType = {
  team_list_color: string;
};
