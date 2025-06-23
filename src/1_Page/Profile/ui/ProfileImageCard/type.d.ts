type ProfileImageCardProps = {
  userInfo: UserInfo;
  isModifyMode?: boolean;
  onImageChange?: (file: File | null) => void;
};
