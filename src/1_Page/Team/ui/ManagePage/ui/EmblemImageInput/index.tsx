import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ImageInputProps, ImageForm } from "./type";
import { schema } from "../../../../../../4_Shared/lib/imgSchema";
import useImageHandler from "./model/useImageHandler";
import usePutTeamEmblem from "../../../../../../3_Entity/Team/usePutTeamEmblem";

const EmblemImageInput = (props: ImageInputProps) => {
  const { imgSrc, team_list_idx } = props;
  const key = "img";

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ImageForm>({
    resolver: yupResolver(schema),
  });

  const {
    imagePreview,
    modifyMode,
    inputFileRef,
    handleImageClick,
    handleImageChange,
    handleCancle,
    handleSave,
  } = useImageHandler({ imgSrc, setValue, clearErrors });

  const [putEvent] = usePutTeamEmblem(team_list_idx);

  const onSubmit: SubmitHandler<ImageForm> = (data) => {
    handleSave();
    putEvent(data.img);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label className="text-sm font-medium text-gray-600">Team Emblem</label>
      <div className="relative space-y-4 bg-gray-50 p-4 rounded-md shadow-md">
        <div className="flex gap-1">
          <img
            className={`h-[40px] w-[40px] object-cover `}
            src={imagePreview}
            alt="Uploaded Emblem Preview"
          />
        </div>

        {modifyMode ? (
          <div className="absolute flex bottom-4 right-4">
            <button
              type="button"
              onClick={handleCancle}
              className=" bg-red-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600 transition-colors duration-200">
              취소
            </button>
            <button
              type="submit"
              className=" bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition-colors duration-200">
              저장
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleImageClick}
            className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition-colors duration-200">
            수정하기
          </button>
        )}

        <div>
          <input
            {...register(key)}
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {errors[key] && (
            <p className="text-red-500 text-xs mt-1">{errors[key].message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default EmblemImageInput;
