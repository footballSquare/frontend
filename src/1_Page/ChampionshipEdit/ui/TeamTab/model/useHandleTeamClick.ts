import React from "react";
import { matchCount } from "../../../../../4_Shared/constant/matchCount";

const useHandleTeamClick = (props: UseHandleTeamClickProps) => {
  const { championshipType, participation_team_idxs, setValue } = props;

  React.useEffect(() => {
    if (championshipType == 0) {
      setValue("team_all_success", true);
    } else if (
      participation_team_idxs?.length === matchCount[championshipType]
    ) {
      setValue("team_all_success", true);
    } else {
      setValue("team_all_success", false);
    }
  }, [championshipType, participation_team_idxs, setValue]);

  const handleTeamClick = (teamIdx: number) => {
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
    if (participation_team_idxs.includes(teamIdx)) {
      setValue(
        "participation_team_idxs",
        participation_team_idxs.filter((id: number) => id !== teamIdx)
      );
    } else {
      // 아직 선택되지 않았고, 최대 수 미만이면 추가
      if (participation_team_idxs.length < maxTeams) {
        setValue("participation_team_idxs", [
          ...participation_team_idxs,
          teamIdx,
        ]);
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
