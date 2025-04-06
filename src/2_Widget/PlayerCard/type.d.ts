type PlayerCardProps = Omit<UserInfo, "Awards" | "mmr">;

type ProfileImageForm = {
  file: File | null;
};
