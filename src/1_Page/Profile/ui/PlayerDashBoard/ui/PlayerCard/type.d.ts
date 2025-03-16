import { UserInfo } from "../../../../../../3_Entity/Account/type";

export type PlayerCardProps = Pick<
  UserInfo,
  "profile_img" | "position" | "nickname" | "is_mine" | "user_idx"
>;

export type ImageForm = {
  profile_img: File | null;
};
