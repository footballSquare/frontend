import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

export type UseImageHandlerProps = {
  imgSrc: string;
  setValue: UseFormSetValue<{ img: File | null }>;
  clearErrors: UseFormClearErrors<{ img: string }>;
};
