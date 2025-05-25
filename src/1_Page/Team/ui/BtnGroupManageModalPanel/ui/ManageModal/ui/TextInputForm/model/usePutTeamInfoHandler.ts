import usePutTeamInfo from "../../../../../../../../../3_Entity/Team/usePutTeamInfo";

const usePutTeamInfoHandler = (
  props: UsePutTeamInfoHandlerProps
): UsePutTeamInfoHandlerReturn => {
  const { teamInfo, setValue, handleSetTeamInfoPreview } = props;
  const [putTeamInfo] = usePutTeamInfo(teamInfo.team_list_idx);

  const handlePutTeamInfo = async (data: TeamInfoForm) => {
    setValue("team_list_name_repeat", false);
    setValue("team_list_short_name_repeat", false);
    handleSetTeamInfoPreview(data);
    const status = await putTeamInfo(data);
    switch (status) {
      case 200:
        break;
      default:
        handleSetTeamInfoPreview({
          team_list_name: teamInfo.team_list_name,
          team_list_short_name: teamInfo.team_list_short_name,
          team_list_color: teamInfo.team_list_color,
          team_list_announcement: teamInfo.team_list_announcement,
          common_status_idx: teamInfo.common_status_idx,
        } as TeamInfoForm);
        alert("팀 정보 수정에 실패했습니다. 다시 시도해주세요.");
        break;
    }
  };
  return {
    handlePutTeamInfo,
  };
};

export default usePutTeamInfoHandler;
