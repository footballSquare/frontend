import usePutTeamInfo from "../../../../../../../../../3_Entity/Team/usePutTeamInfo";

const usePutTeamInfoHandler = (
  props: UsePutTeamInfoHandlerProps
): UsePutTeamInfoHandlerReturn => {
  const { team_list_idx, setValue, handleSetTeamInfoPreview } = props;
  const [putTeamInfo] = usePutTeamInfo(team_list_idx);

  const handlePutTeamInfo = async (data: TeamInfoForm) => {
    const status = await putTeamInfo(data);
    switch (status) {
      case 200:
        setValue("team_list_name_repeat", false);
        setValue("team_list_short_name_repeat", false);
        handleSetTeamInfoPreview(data);
        break;
      default:
        alert("팀 정보 수정에 실패했습니다. 다시 시도해주세요.");
        break;
    }
  };
  return {
    handlePutTeamInfo,
  };
};

export default usePutTeamInfoHandler;
