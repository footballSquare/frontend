type PlayerDashBoardProps = Omit<UserInfo, "Awards" | "mmr">;

type UserInfoForm = {
  nickname: string;
  platform: "pc" | "xbox" | "playstation" | "X";
  discord_tag: string;
  common_status_idx: number;
  state_message: string;
  position: number;
};
