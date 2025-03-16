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

  return [defaultUserInfoInput];
};

export default useInputHandler;
