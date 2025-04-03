type UseManageTeamInfoReturn = {
  displayTeamInfo: TeamInfo;
  handlers: ManageHandlers;
};

type ManageHandlers = {
  handleSetTeamEmblem: (emblem: string) => void;
  handleSetTeamBanner: (banner: string) => void;
  handleSetTeamInfoWithoutImg: (data: TeamInfoForm) => void;
};
