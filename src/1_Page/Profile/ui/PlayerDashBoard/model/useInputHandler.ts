import React from "react";
// 타입
import { UserInfoProps, UserInfoInput } from "../type";
// 상수
import { platform } from "../../../../../4_Shared/constant/platform";
import { matchPosition } from "../../../../../4_Shared/constant/matchPosition";

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
  };

  return [defaultUserInfoInput];
};

export default useInputHandler;
