type SignInEventProps = {
  id: string;
  password: string;
};

type PutUserInfoProps = {
  id: string;
  password: string;
  nickname: string;
  team_idx: number;
  platform: "pc" | "xbox" | "playstation";
  state: number;
  message: string;
  discord_tag: string;
};
