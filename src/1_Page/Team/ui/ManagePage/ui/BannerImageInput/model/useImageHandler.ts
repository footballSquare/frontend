import React from "react";
import { UseImageHandlerProps } from "./type";

const useImageHandler = ({
  imgSrc,
  setValue,
  clearErrors,
}: UseImageHandlerProps): {
  imagePreview: string;
  inputFileRef: React.RefObject<HTMLInputElement>;
  modifyMode: boolean;
  handleImageClick: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancle: () => void;
  handleSave: () => void;
} => {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const [imagePreview, setImagePreview] = React.useState<string>(imgSrc);
  const imageBackupRef = React.useRef<string>(imgSrc);

  const handleSave = () => {
    imageBackupRef.current = imagePreview;
    setModifyMode(false);
  };

  const handleCancle = () => {
    clearErrors();
    setImagePreview(imageBackupRef.current);
    setModifyMode(false);
    if (!inputFileRef.current) return;
    inputFileRef.current.value = "";
  };

  // 이미지 클릭 시 input file 클릭 이벤트 호출
  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setModifyMode(true);
      };
      reader.readAsDataURL(file);
      setValue("img", file);
    }
  };

  return {
    imagePreview,
    inputFileRef,
    modifyMode,
    handleImageClick,
    handleImageChange,
    handleCancle,
    handleSave,
  };
};
export default useImageHandler;
