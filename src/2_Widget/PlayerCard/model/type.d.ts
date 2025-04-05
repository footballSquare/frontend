type UseProfileImageHandlerProps = {
  profile_image: string | null;
  setValue: UseFormSetValue<ImageInput>;
  clearErrors: UseFormClearErrors<ImageInput>;
};

type UseProfileImageHandlerReturn = {
  preview: string | null;
  modifyMode: boolean;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleSetDefaultImage: () => void;
};
