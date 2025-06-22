import usePutProfileImage from "../../../3_Entity/Account/usePutProfileImage";

const usePutProfileImageHandler = (
  props: UsePutProfileImageHandler
): [(file: File | null) => void] => {
  const { handleCancel, onImageChange, handleBackup, handleCloseModifyMode } =
    props;
  const [putProfileImage] = usePutProfileImage();

  const handlePutUserInfo = async (file: File | null) => {
    const result = await putProfileImage(file);
    handleCloseModifyMode();
    if (result === 200) {
      handleBackup();
      if (onImageChange) {
        onImageChange(file);
      }
    } else {
      handleCancel();
      alert("변경 실패했습니다");
    }
  };

  return [handlePutUserInfo];
};
export default usePutProfileImageHandler;
