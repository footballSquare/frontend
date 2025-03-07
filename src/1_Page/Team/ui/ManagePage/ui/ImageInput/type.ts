export type ImageInputProps = {
  imgSrc: string;
  width: string;
  height: string;
  isEmblem: boolean;
  putEvent: (img?: File | null) => void;
};

export type ImageInputType = {
  img?: File | null;
};
