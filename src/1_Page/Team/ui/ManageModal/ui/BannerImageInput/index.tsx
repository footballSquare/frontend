import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../../../../4_Shared/lib/imgSchema";
import useImageHandler from "./model/useImageHandler";
import usePutTeamBanner from "../../../../../../3_Entity/Team/usePutTeamBanner";

const BannerImageInput = (props: BannerImageInputProps) => {
  const { imgSrc, team_list_idx, handleSetBanner } = props;
  const key = "file";
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ImageForm>({
    resolver: yupResolver(schema),
  });

  const [putTeamBanner] = usePutTeamBanner(team_list_idx);

  const {
    imagePreview,
    modifyMode,
    inputFileRef,
    handleImageClick,
    handleImageChange,
    handleCancle,
    handleSave,
  } = useImageHandler({
    imgSrc,
    setValue,
    clearErrors,
  });

  const onSubmit: SubmitHandler<ImageForm> = (props) => {
    handleSave();
    handleSetBanner(imagePreview);
    putTeamBanner(props.file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label className="text-sm font-medium text-gray-600">Team Emblem</label>
      <div className="relative space-y-4 bg-gray-50 p-4 rounded-md shadow-md">
        <div className="flex gap-1">
          <img
            className={`w-full h-[100px] object-cover `}
            src={imagePreview}
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

export default BannerImageInput;
