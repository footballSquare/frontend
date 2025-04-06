type PlayerDashBoardProps = Omit<UserInfo, "Awards" | "mmr">;

type UserInfoForm = {
  nickname: string;
  platform: "PC" | "XBOX" | "PS4" | "X";
  discord_tag: string | null;
  common_status_idx: number;
  message: string | null;
  match_position_idx: number;
};
