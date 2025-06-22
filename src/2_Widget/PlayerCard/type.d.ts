type PlayerCardProps = {
  isMine: boolean;
  userIdx: number;
  profileImage: string | null;
  teamName: string | null;
  nickname: string | null;
  matchPositionIdx: number | null;
  onImageChange?: (file: File | null) => void;
};

type ProfileImageForm = {
  file: File | null;
};
