type PostSignInProps = {
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

type PostCheckIdProps = {
  id: string;
};

type PostCheckNickNameProps = {
  nickname: string;
};

type PostTemporalSignUpProps = {
  id: string;
  password: string;
};

type PostSignUpProps = {
  phone: string;
  nickname: string;
  platform: "pc" | "xbox" | "playstation";
  common_status_idx: number;
  message?: string;
  discord_tag: string;
  match_position_idx: number;
};

type PostReceiveAuthSmsProps = {
  phone: string;
};

type PostCheckAuthSmsProps = {
  phone: string;
  code: string;
};

type GetDiscordSiginIn = {
  code: string;
  state: string;
};
