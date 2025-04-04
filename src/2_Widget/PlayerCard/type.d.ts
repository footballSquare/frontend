type PlayerCardProps = Omit<
  UserInfo,
  "winning_rate" | "trophies" | "match_count" | "MMR"
>;

type ImageForm = {
  file: File | null;
};
