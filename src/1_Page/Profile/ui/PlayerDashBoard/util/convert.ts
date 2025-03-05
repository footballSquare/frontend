import { matchPosition } from "../../../../../4_Shared/constant/matchPosition";
import { platform } from "../../../../../4_Shared/constant/platform";
import { UserInfoInput } from "../type";
import { UserInfoPost } from "../../../../../3_Entity/Account/type";

export const converPostData = (data: UserInfoInput): UserInfoPost => {
  const postFormData = {
    state_message: data.state_message,
    nickname: data.nickname,
    team: data.team,
    platform: platform.indexOf(data.platform),
    position: matchPosition.indexOf(data.position),
    common_status_idx: data.common_status_idx,
  };
  return postFormData;
};
