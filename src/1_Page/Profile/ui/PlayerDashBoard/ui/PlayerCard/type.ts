import { UserInfo } from "../../../../../../3_Entity/Account/type";

export type PlayerCardProps = Pick<
  UserInfo,
  "profile_img" | "position" | "name" | "tag"
>;

export type ImageInput = {
  profile_img: File | undefined;
};
