import { matchPosition } from "../../../../../4_Shared/constant/matchPosition";
import { commonStatusIdx } from "../../../../../4_Shared/constant/commonStatusIdx";

export const convertToPostData = (data: UserInfoForm): UsePutUserInfoProps => {
  const postFormData = {
    nickname: data.nickname,
    platform: data.platform,
    state: data.state,
    message: data.message,
    discord_tag: data.discord_tag,
    team_idx: data.team,
  };

  return postFormData;
};

export const convertToInfoForm = (
  userInfo: PlayerDashBoardProps
): UserInfoForm => {
  return {
    ...userInfo,
    position: matchPosition[Number(userInfo.position)],
    common_status_idx: commonStatusIdx[Number(userInfo.common_status_idx)],
  };
};
