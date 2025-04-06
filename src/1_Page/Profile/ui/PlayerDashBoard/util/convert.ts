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
    ...userInfo,
    platform: userInfo.platform === null ? "X" : userInfo.platform,
    discord_tag: userInfo.discord_tag ?? "",
    message: userInfo.message ?? "",
  };
};
