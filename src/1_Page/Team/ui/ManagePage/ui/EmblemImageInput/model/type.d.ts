import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

export type UseImageHandlerProps = {
  imgSrc: string;
  setValue: UseFormSetValue<{ img: File }>;
  clearErrors: UseFormClearErrors<{ img: string }>;
};
