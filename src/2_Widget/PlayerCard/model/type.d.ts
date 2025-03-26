export type UseImageHandlerProps = {
  profile_img: string | null;
  setValue: UseFormSetValue<ImageInput>;
  clearErrors: UseFormClearErrors<ImageInput>;
};
