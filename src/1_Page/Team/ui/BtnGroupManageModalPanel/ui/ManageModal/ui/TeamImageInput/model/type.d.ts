type ImageInputForm = {
  file: File;
};

type UseTeamImageInputProps = {
  initialSrc: string | null;
  handleChangePreview?: (src: string) => void;
  putImage: (file: File) => Promise<number | undefined>;
};
