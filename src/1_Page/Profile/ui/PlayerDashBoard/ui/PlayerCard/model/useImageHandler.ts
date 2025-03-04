import React from "react";
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import { ImageInput } from "../type";

const useImageHandler = (
  profile_img: string,
  setValue: UseFormSetValue<ImageInput>,
  clearErrors: UseFormClearErrors<ImageInput>
) => {
  const backupImageRef = React.useRef<string | null>(profile_img); // 초기 이미지 저장
  const [preview, setPreview] = React.useState<string | null>(profile_img);
  const [isEditing, setIsEditing] = React.useState<boolean>(false); // 수정 모드 상태

  // userInfo 변경 시 초기화
  React.useEffect(() => {
    setPreview(profile_img);
    backupImageRef.current = profile_img;
  }, [profile_img]);

  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setValue("profile_img", file);
      setIsEditing(true); // 변경되었으므로 버튼 표시
    }
  };

  // 취소 버튼 클릭 시 원래 이미지로 되돌리기
  const handleCancel = () => {
    setPreview(backupImageRef.current);
    setIsEditing(false);
    clearErrors();
  };

  // 저장 버튼 클릭 시 변경된 이미지 유지
  const handleSave = () => {
    backupImageRef.current = preview;
    setIsEditing(false);
  };

  const handleSetDefaultImage = () => {
    setPreview(null);
    setIsEditing(true);
  };
  return {
    preview,
    isEditing,
    handleImageChange,
    handleCancel,
    handleSave,
    handleSetDefaultImage,
  };
};

export default useImageHandler;
