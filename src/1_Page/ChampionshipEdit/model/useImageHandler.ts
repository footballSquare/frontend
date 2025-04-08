import React from "react";

const useImageHandler = (): [
  string | null,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  // 트로피 이미지 미리보기
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  return [previewImage, handleImageChange];
};

export default useImageHandler;
