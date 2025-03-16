export type PlayerCardProps = {
  profile_img: string;
  position: number;
  nickname: string;
  is_mine: boolean;
  user_idx: number;
  team: string;
};

export type ImageForm = {
  profile_img: File | null;
};
