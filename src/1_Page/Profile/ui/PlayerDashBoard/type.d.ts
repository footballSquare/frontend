type PlayerDashBoardProps = {
  userInfo: UserInfo;
};

type UserInfoForm = {
  nickname: string;
  platform: Platform;
  discord_tag: string;
  common_status_idx: number;
  message: string | null;
  match_position_idx: number;
};
