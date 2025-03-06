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
  const prevModifyModeRef = React.useRef<boolean>(modifyMode);

  React.useEffect(() => {
    if (cancleTrigger) {
      setImagePreview(imagePreviewBackupRef.current);
    }
    prevModifyModeRef.current = modifyMode;
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
    const file = event.target.files?.[0]; // 첫 번째 파일을 선택
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 미리보기 이미지 설정
      };
      reader.readAsDataURL(file); // 파일을 URL로 변환
    }
  };
  return [imagePreview, handleImageClick, handleImageChange];
};
export default useImageHandler;
