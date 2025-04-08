export const convertToPostData = (data: UserInfoForm): UsePutUserInfoProps => {
  const postFormData = {
    ...data,
    platform: data.platform === "X" ? null : data.platform,
  };

  return postFormData;
};

export const convertToInfoForm = (
  userInfo: PlayerDashBoardProps
): UserInfoForm => {
  return {
    nickname: userInfo.nickname,
    common_status_idx: userInfo.common_status_idx,
    platform: userInfo.platform === null ? "X" : userInfo.platform,
    discord_tag: userInfo.discord_tag,
    message: userInfo.message,
    match_position_idx: userInfo.match_position_idx,
  };
};
