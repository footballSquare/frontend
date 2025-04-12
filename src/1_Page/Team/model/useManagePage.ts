import React from "react";

const useManageTeamInfo = (teamInfo: TeamInfo): UseManageTeamInfoReturn => {
  const [displayTeamInfo, setDisplayTeamInfo] = React.useState<TeamInfo>(
    {} as TeamInfo
  );
  React.useEffect(() => {
    setDisplayTeamInfo(teamInfo);
  }, [teamInfo]);

  const handlers = {
    handleSetTeamBanner: (banner: string | null) => {
      setDisplayTeamInfo((prev) => ({
        ...prev,
        team_list_banner: banner,
      }));
    },
    handleSetTeamEmblem: (emblem: string | null) => {
      setDisplayTeamInfo((prev) => ({
        ...prev,
        team_list_emblem: emblem,
      }));
    },
    handleSetTeamInfoWithoutImg: (data: TeamInfoForm) => {
      setDisplayTeamInfo((prev) => ({
        ...prev,
        team_list_name: data.team_list_name,
        team_list_short_name: data.team_list_short_name,
        team_list_color: data.team_list_color,
        team_list_announcement: data.team_list_announcement,
      }));
    },
  };

  return {
    displayTeamInfo,
    handlers,
  };
};

export default useManageTeamInfo;
