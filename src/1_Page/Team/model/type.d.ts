type UseManageTeamInfoReturn = {
  displayTeamInfo: TeamInfo;
  handlers: ManageHandlers;
};

type ManageHandlers = {
  handlesetTeamEmblem: (emblem: string) => void;
  handleSetWithoutImg: (
    team_list_name: string,
    team_list_short_name: string,
    team_list_color: string,
    team_list_announcement: string
  ) => void;
  handleSetTeamBanner: (banner: string) => void;
};
