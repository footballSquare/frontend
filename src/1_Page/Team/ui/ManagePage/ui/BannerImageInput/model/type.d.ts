import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
// import 구문으로 전역 사용 불가

export type UseImageHandlerProps = {
  imgSrc: string;
  setValue: UseFormSetValue<{ img: File }>;
  clearErrors: UseFormClearErrors<{ img: string }>;
};
