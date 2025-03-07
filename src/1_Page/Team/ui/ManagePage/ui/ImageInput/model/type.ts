import {
  UseFormSetError,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";

export type UseImageHandlerReturnType = [
  imagePreview: string,
  modifyMode: boolean,
  handleImageClick: () => void,
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleCancle: () => void,
  handleSave: () => void
];

export type UseImageHandlerProps = {
  imgSrc: string;
  inputFileRef: React.RefObject<HTMLInputElement>;
  setValue: UseFormSetValue<{ img?: File | null }>;
  clearErrors: UseFormClearErrors<{ img: string }>;
};
