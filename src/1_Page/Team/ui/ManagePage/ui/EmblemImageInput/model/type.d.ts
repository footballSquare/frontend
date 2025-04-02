import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

export type UseImageHandlerProps = {
  imgSrc: string;
  setValue: UseFormSetValue<{ file: File }>;
  clearErrors: UseFormClearErrors<{ file: string }>;
};
