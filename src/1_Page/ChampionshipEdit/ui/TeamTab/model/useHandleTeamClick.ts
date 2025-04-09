const useHandleTeamClick = (props: UseHandleTeamClickProps) => {
  const { championshipType, watch, setValue } = props;
  const handleTeamClick = (teamIdx: number) => {
    const currentTeams = watch("participation_team_idxs");
    // 토너먼트라면 최대 팀 수 제한
    let maxTeams = 9999;
    if (championshipType === 2) {
      // 2: 16강 토너먼트
      maxTeams = 16;
    } else if (championshipType === 3) {
      // 3: 8강 토너먼트
      maxTeams = 8;
    } else if (championshipType === 4) {
      // 예를 들어 4: 4강 토너먼트
      maxTeams = 4;
    }
    // 이미 선택된 상태라면 해제
    if (currentTeams.includes(teamIdx)) {
      setValue(
        "participation_team_idxs",
        currentTeams.filter((id: number) => id !== teamIdx)
      );
    } else {
      // 아직 선택되지 않았고, 최대 수 미만이면 추가
      if (currentTeams.length < maxTeams) {
        setValue("participation_team_idxs", [...currentTeams, teamIdx]);
      } else {
        alert(
          `${
            championshipType === 2
              ? "16강"
              : championshipType === 3
              ? "8강"
              : "4강"
          } 토너먼트는 최대 ${maxTeams}개 팀만 선택 가능합니다.`
        );
      }
    }
  };

  return handleTeamClick;
};
export default useHandleTeamClick;
