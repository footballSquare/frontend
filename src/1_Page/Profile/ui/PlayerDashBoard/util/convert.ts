export const convertToInfoForm = (
  userInfo: PlayerDashBoardProps
): UserInfoForm => {
  return {
    nickname: userInfo.nickname,
    common_status_idx: userInfo.common_status_idx,
    platform: userInfo.platform,
    discord_tag: userInfo.discord_tag,
    message: userInfo.message,
    match_position_idx: userInfo.match_position_idx,
  };
};
