import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

export type UseImageHandlerProps = {
  imgSrc: string;
  inputFileRef: React.RefObject<HTMLInputElement>;
  setValue: UseFormSetValue<{ img?: File | null }>;
  clearErrors: UseFormClearErrors<{ img: string }>;
};
