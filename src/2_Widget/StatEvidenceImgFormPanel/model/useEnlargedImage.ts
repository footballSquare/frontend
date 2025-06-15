import React from "react";

const useEnlargedImage = () => {
  const [enlargedImage, setEnlargedImage] = React.useState<string | null>(null);

  // 이미지 확대 모달
  const handleImageEnlarge = (imageSrc: string) => {
    setEnlargedImage(imageSrc);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };
  return {
    enlargedImage,
    handleImageEnlarge,
    closeEnlargedImage,
  };
};

export default useEnlargedImage;
