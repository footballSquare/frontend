export type ImageInputProps = {
  imgSrc: string;
  width: string;
  height: string;
  putEvent: (img?: File | null) => void;
};

export type ImageInputType = {
  img?: File | null;
};
