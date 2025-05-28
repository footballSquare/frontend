type TeamImageInputProps = {
  label?: string;
  placeholderText: string;
  width?: string;
  height?: string;
  initialSrc: string | null;
  handleChangePreview?: (src: string | null) => void;
  putImage: (file: File) => Promise<number | undefined>;
};

type ImageInputForm = {
  file: File;
};
