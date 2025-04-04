type PlayerCardProps = Omit<
  UserInfo,
  "winning_rate" | "trophies" | "match_count" | "mmr"
>;

type ImageForm = {
  file: File | null;
};
