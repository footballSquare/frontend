type TeamImageInputProps = {
  isBanner: boolean;
  imgSrc: string | null;
  putImage: (file: File) => void;
  handleSetTeamImg: (imgUrl: string) => void;
};

type ImageForm = {
  file: File;
};
