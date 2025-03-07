import React from "react";
import { UseImageHandlerReturnType, UseImageHandlerProps } from "./type";

const useImageHandler = ({
  imgSrc,
  inputFileRef,
  setError,
  clearErrors,
}: UseImageHandlerProps): UseImageHandlerReturnType => {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const [imagePreview, setImagePreview] = React.useState<string>(imgSrc);
  const imageBackupRef = React.useRef<string>(imgSrc);

  const handleSave = () => {
    imageBackupRef.current = imagePreview;
    setModifyMode(false);
  };

  const handleCancle = () => {
    setImagePreview(imageBackupRef.current);
    setModifyMode(false);
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
    clearErrors();
    const file = event.target.files?.[0];
    if (file) {
      if (file.size >= 2 * 1024 * 1024) {
        setError("emblem", {
          type: "manual",
          message: "파일 크기가 2MB를 초과할 수 없습니다.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setModifyMode(true);
        event.target.value = "";
      };
      reader.readAsDataURL(file);
    }
  };
  return [
    imagePreview,
    modifyMode,
    handleImageClick,
    handleImageChange,
    handleCancle,
    handleSave,
  ];
};
export default useImageHandler;
