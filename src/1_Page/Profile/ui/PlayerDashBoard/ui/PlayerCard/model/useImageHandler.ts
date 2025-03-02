import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { PlayerCardProps } from "../type";

const useImageHandler = (
  userInfo: PlayerCardProps,
  originalImageRef: React.MutableRefObject<string>,
  setValue: UseFormSetValue<{ profile_img: File | null }>
) => {
  const [preview, setPreview] = React.useState<string>(userInfo.profile_img);
  const [isEditing, setIsEditing] = React.useState<boolean>(false); // 수정 모드 상태
  // userInfo 변경 시 초기화
  React.useEffect(() => {
    setPreview(userInfo.profile_img);
    originalImageRef.current = userInfo.profile_img;
  }, [userInfo]);
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
    setPreview(originalImageRef.current);
    setIsEditing(false);
  };

  // 저장 버튼 클릭 시 변경된 이미지 유지
  const handleSave = () => {
    originalImageRef.current = preview;
    setIsEditing(false);
  };
  return { preview, isEditing, handleImageChange, handleCancel, handleSave };
};

export default useImageHandler;
