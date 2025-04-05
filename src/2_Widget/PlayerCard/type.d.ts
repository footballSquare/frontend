type PlayerCardProps = Omit<
  UserInfo,
  "winning_rate" | "trophies" | "match_count" | "mmr"
>;

type ProfileImageForm = {
  file: File | null;
};
