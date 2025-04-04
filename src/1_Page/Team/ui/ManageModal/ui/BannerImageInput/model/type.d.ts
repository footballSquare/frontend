type UseImageHandlerProps = {
  imgSrc: string;
  setValue: UseFormSetValue<{ file: File }>;
  clearErrors: UseFormClearErrors<{ file: string }>;
};

type UseImageHandlerReturn = {
  imagePreview: string;
  inputFileRef: React.RefObject<HTMLInputElement>;
  modifyMode: boolean;
  handleImageClick: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancle: () => void;
  handleSave: () => void;
};
