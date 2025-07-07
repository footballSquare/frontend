import React from "react";
import useGetTeamInfo from "../../../3_Entity/Team/useGetTeamInfo";
import useValidParamInteger from "../../../4_Shared/model/useValidParamInteger";

const useGetTeamInfoHandler = (): useGetTeamInfoHandlerReturn => {
  const [teamIdx] = useValidParamInteger("teamIdx");

  const [teamInfo, loading] = useGetTeamInfo(teamIdx);

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
    loading,
    handlers,
  };
};

export default useGetTeamInfoHandler;
