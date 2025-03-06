import React from "react";
// 타입
import { TeamInfo } from "../../../../../3_Entity/Team/type";
import { TeamInfoInput } from "../type";

const useInputHandler = (
  reset: (input: TeamInfoInput) => void,
  teamInfo: TeamInfo
): [TeamInfoInput] => {
  React.useEffect(() => {
    reset(defaultTeamInfoInput);
  }, [teamInfo]);

  const defaultTeamInfoInput: TeamInfoInput = {
    ...teamInfo,
  };

  return [defaultTeamInfoInput];
};

export default useInputHandler;
