type UseProfileImageHandlerProps = {
  profileImage: string | null;
  setValue: UseFormSetValue<ImageInput>;
  clearErrors: UseFormClearErrors<ImageInput>;
};

type UseProfileImageHandlerReturn = {
  preview: string | null;
  modifyMode: boolean;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  handleSetDefaultImage: () => void;
  handleCloseModifyMode: () => void;
  handleBackup: () => void;
};

type UsePutProfileImageHandler = {
  handleBackup: () => void;
  handleCloseModifyMode: () => void;
  handleCancel: () => void;
  onImageChange?: (file: File | null) => void;
};
