export type UserInfoPost = {
  nickname: string;
  platform: number;
  common_status_idx: number;
  position: number;
  state_message: string;
};

type SignInEventProps = {
  id: string;
  password: string;
};
