type PlayerDashBoardProps = Omit<UserInfo, "Awards" | "mmr">;

type UserInfoForm = {
  nickname: string;
  platform: "PC" | "XBOX" | "PS4" | "X";
  discord_tag: string;
  common_status_idx: number;
  message: string;
  match_position_idx: number;
};
