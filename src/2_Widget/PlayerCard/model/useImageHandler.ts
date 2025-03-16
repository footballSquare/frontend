import React from "react";
import { UseImageHandlerProps } from "./type";

const useImageHandler = (
  props: UseImageHandlerProps
): {
  preview: string | null;
  modifyMode: boolean;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleSetDefaultImage: () => void;
} => {
  const { profile_img, setValue, clearErrors } = props;
  const backupImageRef = React.useRef<string | null>(profile_img); // 초기 이미지 저장
  const [preview, setPreview] = React.useState<string | null>(profile_img);
  const [modifyMode, setModifyMode] = React.useState<boolean>(false); // 수정 모드 상태

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
      setModifyMode(true); // 변경되었으므로 버튼 표시
    }
  };

  // 취소 버튼 클릭 시 원래 이미지로 되돌리기
  const handleCancel = () => {
    setPreview(backupImageRef.current);
    setModifyMode(false);
    clearErrors();
  };

  // 저장 버튼 클릭 시 변경된 이미지 유지
  const handleSave = () => {
    backupImageRef.current = preview;
    setModifyMode(false);
  };

  const handleSetDefaultImage = () => {
    setPreview(null);
    setModifyMode(true);
  };
  return {
    preview,
    modifyMode,
    handleImageChange,
    handleCancel,
    handleSave,
    handleSetDefaultImage,
  };
};

export default useImageHandler;
