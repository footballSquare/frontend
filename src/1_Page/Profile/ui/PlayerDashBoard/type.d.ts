type PlayerDashBoardProps = Omit<
  UserInfo,
  "match_count" | "winning_rate" | "trophies" | "mmr"
>;

type UserInfoForm = {
  nickname: string;
  platform: string;
  team: string;
  position: string;
  state: number;
  message: string;
  discord_tag: string;
};
