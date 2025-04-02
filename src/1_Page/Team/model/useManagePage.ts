import React from "react";

const useManageTeamInfo = (teamInfo: TeamInfo): UseManageTeamInfoReturn => {
  const [displayTeamInfo, setDisplayTeamInfo] =
    React.useState<TeamInfo>(teamInfo);

  const handlers = {
    handleSetTeamBanner: (banner: string) => {
      setDisplayTeamInfo((prev) => ({
        ...prev,
        team_list_banner: banner,
      }));
    },
    handleSetTeamEmblem: (emblem: string) => {
      setDisplayTeamInfo((prev) => ({
        ...prev,
        team_list_emblem: emblem,
      }));
    },
    handleSetWithoutImg: (
      team_list_name: string,
      team_list_short_name: string,
      team_list_color: string,
      team_list_announcement: string
    ) => {
      setDisplayTeamInfo((prev) => ({
        ...prev,
        team_list_name,
        team_list_short_name,
        team_list_color,
        team_list_announcement,
      }));
    },
  };

  return {
    displayTeamInfo,
    handlers,
  };
};

export default useManageTeamInfo;
