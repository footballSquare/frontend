import React from "react";
// 타입
import { UserInfoProps, UserInfoInput } from "../type";
// 상수
import { platform } from "../../../../../4_Shared/constant/platform";
import { matchPosition } from "../../../../../4_Shared/constant/matchPosition";
import { commonStatusIdx } from "../../../../../4_Shared/constant/commonStatusIdx";

const useInputHandler = (
  reset: (input: UserInfoInput) => void,
  userInfo: UserInfoProps
): [UserInfoInput] => {
  React.useEffect(() => {
    reset(defaultUserInfoInput);
  }, [userInfo]);

  const defaultUserInfoInput: UserInfoInput = {
    ...userInfo,
    platform: platform[userInfo.platform],
    position: matchPosition[userInfo.position],
    common_status_idx: commonStatusIdx[userInfo.common_status_idx],
  };

  return [defaultUserInfoInput];
};

export default useInputHandler;
