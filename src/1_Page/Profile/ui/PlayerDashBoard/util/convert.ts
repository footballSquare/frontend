import { matchPosition } from "../../../../../4_Shared/constant/matchPosition";
import { platform } from "../../../../../4_Shared/constant/platform";
import { commonStatusIdx } from "../../../../../4_Shared/constant/commonStatusIdx";

import { UserInfoForm, PlayerDashBoardProps } from "../type";
import { UserInfoPost } from "../../../../../3_Entity/Account/types/request";

export const convertToPostData = (data: UserInfoForm): UserInfoPost => {
  const postFormData = {
    state_message: data.state_message,
    nickname: data.nickname,
    team: data.team,
    platform: platform.indexOf(data.platform),
    position: matchPosition.indexOf(data.position),
    common_status_idx: commonStatusIdx.indexOf(data.common_status_idx),
  };
  return postFormData;
};

export const convertToInfoForm = (
  userInfo: PlayerDashBoardProps
): UserInfoForm => {
  return {
    ...userInfo,
    platform: platform[Number(userInfo.platform)],
    position: matchPosition[Number(userInfo.position)],
    common_status_idx: commonStatusIdx[Number(userInfo.common_status_idx)],
  };
};
