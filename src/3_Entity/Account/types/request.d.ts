type SignInEventProps = {
  id: string;
  password: string;
};

type UsePutUserInfoProps = {
  nickname: string;
  platform: Platform;
  discord_tag: string | null;
  common_status_idx: number;
  message: string | null;
  match_position_idx: number;
};

type UserProfileProps = {
  nickname: string;
  platform: "pc" | "xbox" | "playstation";
  common_status_idx: number;
  message: string;
  discord_tag: string;
  match_position_idx: number;
};
