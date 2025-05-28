type ImageInputForm = {
  file: File;
};

type UseTeamImageInputProps = {
  initialSrc: string | null;
  handleChangePreview?: (src: string | null) => void;
  putImage: (file: File) => Promise<number | undefined>;
};
