type PlayerDashBoardProps = Omit<UserInfo, "Awards" | "mmr">;

type UserInfoForm = {
  nickname: string;
  platform: "PC" | "XBOX" | "PS4" | "X";
  discord_tag: string | null;
  message: string | null;
  common_status_idx: number;
  match_position_idx: number;
};
