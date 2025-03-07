import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useImageHandler from "./model/useImageHandler"; // 이미지를 처리하는 훅을 불러옵니다.
import { ImageInputProps } from "./type"; // 타입을 불러옵니다.

const EmblemImageInput = (props: ImageInputProps) => {
  const { imgSrc, width, height, isEmblem } = props;

  const schema = yup.object({
    emblem: yup.mixed().required("이미지를 업로드해야 합니다."),
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [
    imagePreview,
    modifyMode,
    handleImageClick,
    handleImageChange,
    handleCancle,
    handleSave,
  ] = useImageHandler({ imgSrc, inputFileRef, setError, clearErrors });

  const onSubmit = (data: any) => {
    console.log("Form data: ", data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(e);
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-600">Team Emblem</label>
      <div className="relative space-y-4 bg-gray-50 p-4 rounded-md shadow-md">
        <div className="flex gap-1">
          <img
            className={`${width} ${height} object-cover `}
            src={imagePreview}
            alt="Uploaded Emblem Preview"
          />
          {isEmblem && (
            <img
              className={`${width} ${height} object-cover rounded-full `}
              src={imagePreview}
              alt="Uploaded Emblem Preview"
            />
          )}
        </div>

        {modifyMode ? (
          <div className="absolute flex bottom-4 right-4">
            <button
              onClick={handleCancle}
              className=" bg-red-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600 transition-colors duration-200">
              취소
            </button>
            <button
              type="submit"
              onClick={handleSave}
              className=" bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition-colors duration-200">
              저장
            </button>
          </div>
        ) : (
          <button
            onClick={handleImageClick}
            className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition-colors duration-200">
            수정하기
          </button>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("emblem")} // Use register to register the input
              ref={inputFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange} // Handling file change
            />
            {errors.emblem && (
              <p className="text-red-500 text-xs mt-1">
                {errors.emblem.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmblemImageInput;
