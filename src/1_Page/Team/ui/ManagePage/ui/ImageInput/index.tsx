import React from "react";
import useImageHandler from "./model/useImageHandler";

import { ImageInputProps } from "./type";

const ImageInput = (props: ImageInputProps) => {
  const {
    cancleRef,
    label,
    name,
    register,
    errorsMessage,
    modifyMode,
    imgSrc,
  } = props;
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [imagePreview, handleImageClick, handleImageChange] = useImageHandler(
    imgSrc,
    inputFileRef,
    modifyMode,
    cancleRef.current
  );

  return (
    <div className="w-full">
      <label htmlFor={name} className="text-xs font-medium text-gray-600">
        {label}
      </label>

      <input
        key={"input_" + modifyMode}
        {...register(name)}
        ref={inputFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        disabled={!modifyMode}
      />

      {/* 클릭 시 파일 입력 창을 열 수 있는 이미지 미리보기 */}
      <div
        onClick={handleImageClick}
        className={`flex flex-col items-center ${
          !modifyMode ? "cursor-default" : "cursor-pointer"
        }`}>
        <img className="w-full h-40 object-cover " src={imagePreview} />
      </div>

      {/* 오류 메시지 표시 */}
      {errorsMessage && (
        <p className="text-red-500 text-xs mt-1">{errorsMessage}</p>
      )}
    </div>
  );
};

export default ImageInput;
