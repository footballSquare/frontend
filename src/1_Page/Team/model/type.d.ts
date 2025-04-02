type UseManageTeamInfoReturn = {
  displayTeamInfo: TeamInfo;
  handlers: ManageHandlers;
};

type ManageHandlers = {
  handleSetTeamEmblem: (emblem: string) => void;
  handleSetWithoutImg: (data: TeamInfoForm) => void;
  handleSetTeamBanner: (banner: string) => void;
};
