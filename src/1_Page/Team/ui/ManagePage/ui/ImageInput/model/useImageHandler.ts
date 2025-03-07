import React from "react";

const useImageHandler = (
  defaultImg: string,
  inputFileRef: React.RefObject<HTMLInputElement>,
  modifyMode: boolean,
  cancleTrigger: boolean | null
): [
  imagePreview: string,
  handleImageClick: () => void,
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
] => {
  const [imagePreview, setImagePreview] = React.useState<string>(defaultImg);
  const imagePreviewBackupRef = React.useRef<string>(defaultImg);

  // 이미지 캔슬
  React.useEffect(() => {
    if (cancleTrigger) {
      setImagePreview(imagePreviewBackupRef.current);
      return;
    }
    imagePreviewBackupRef.current = imagePreview;
  }, [modifyMode]);

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
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return [imagePreview, handleImageClick, handleImageChange];
};
export default useImageHandler;
