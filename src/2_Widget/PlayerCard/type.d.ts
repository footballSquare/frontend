type PlayerCardProps = Omit<UserInfo, "Awards" | "mmr"> & {
  onImageChange?: (file: File | null) => void;
};

type ProfileImageForm = {
  file: File | null;
};
