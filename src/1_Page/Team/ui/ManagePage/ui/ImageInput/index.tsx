import React, { RefObject } from "react";
import { UseFormRegister } from "react-hook-form";
import { TeamInfoInput } from "../../type"; // TeamInfoInput 타입 가져오기
import useImageHandler from "./model/useImageHandler";

type ImageInputProps = {
  cancleRef: RefObject<boolean>;
  name: keyof TeamInfoInput; // 필드 이름을 TeamInfoInput의 키로 설정
  imgSrc: string;
  label: string;
  register: UseFormRegister<TeamInfoInput>;
  modifyMode: boolean;
  errorsMessage?: string; // errorsMessage는 optional로 변경
};

const ImageInput = ({
  cancleRef,
  label,
  name,
  register,
  errorsMessage,
  modifyMode,
  imgSrc,
}: ImageInputProps) => {
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

      {/* 숨겨진 파일 입력 */}
      <input
        key={"input_" + modifyMode}
        {...register(name)} // register에 name을 동적으로 전달
        ref={inputFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        disabled={!modifyMode}
      />

      {/* 클릭 시 파일 입력 창을 열 수 있는 이미지 미리보기 */}
      <div
        onClick={handleImageClick} // 이미지 클릭 시 파일 입력 창 열기
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
