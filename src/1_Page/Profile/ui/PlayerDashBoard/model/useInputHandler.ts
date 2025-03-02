import React from "react";
import { UserInfoInput } from "../../../../../3_Entity/Account/type";
import { platform } from "../../../../../4_Shared/constant/platform";
import { matchPosition } from "../../../../../4_Shared/constant/matchPosition";
import { UserInfoProps } from "../type";

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
