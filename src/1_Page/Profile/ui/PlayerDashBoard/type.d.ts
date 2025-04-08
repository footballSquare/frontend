type PlayerDashBoardProps = Omit<UserInfo, "Awards" | "mmr">;

type UserInfoForm = {
  nickname: string;
  platform: Platform;
  discord_tag: string | null;
  common_status_idx: number;
  message: string | null;
  match_position_idx: number;
};
