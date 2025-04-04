import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useImageHandler from "./model/useImageHandler";
import usePutProfileImage from "../../3_Entity/Account/usePutProfileImage";

import { schema } from "../../4_Shared/lib/imgSchema";
import { matchPosition } from "../../4_Shared/constant/matchPosition";
import profile from "../../4_Shared/assets/svg/profile.svg";
import camera from "../../4_Shared/assets/svg/camera.svg";

const PlayerCard = (props: PlayerCardProps) => {
  // is_mine  = true : 수정가능 / = false 수정 불가능
  const { is_mine, user_idx, nickname, position, profile_image, team } = props;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ImageForm>({
    resolver: yupResolver(schema),
  });

  const {
    preview,
    modifyMode,
    handleImageChange,
    handleCancel,
    handleSave,
    handleSetDefaultImage,
  } = useImageHandler({ profile_image, setValue, clearErrors });

  const [putEvent] = usePutProfileImage();

  const onSubmit: SubmitHandler<ImageForm> = (data) => {
    handleSave();
    putEvent(data.file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] h-[100%]">
      <div className=" bg-gray-800 text-white rounded-md overflow-hidden shadow-lg border border-gray-700">
        {/* Header with position badge */}
        <div className="relative h-12 bg-blue-600 flex items-center px-3">
          <div className="absolute top-2 right-2 bg-gray-900 text-xs font-medium px-2 py-1 rounded-full">
            {matchPosition[position]}
          </div>
        </div>

        {/* Profile section */}
        <div className="relative flex items-center px-4 pt-8 pb-3">
          <div className="absolute -top-8 left-4 w-16 h-16">
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("file")}
              onChange={is_mine ? handleImageChange : undefined}
              disabled={!is_mine}
            />
            <label
              htmlFor="profileImg"
              className={`block ${
                is_mine ? "cursor-pointer group" : "cursor-default"
              }`}>
              <div className="relative">
                <img
                  className="w-16 h-16 object-cover rounded-full border-[3px] border-gray-800 bg-white"
                  src={preview ? preview : profile}
                  alt="프로필 미리보기"
                />
                {is_mine && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <img src={camera} />
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="ml-20">
            <div className="font-bold">{nickname}</div>
            <div className="text-xs text-gray-400">#{user_idx}</div>
          </div>
        </div>

        {/* Control buttons */}
        {is_mine ? (
          <div className="bg-gray-900 px-4 py-2">
            {modifyMode ? (
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="flex-1 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-sm transition-colors"
                  onClick={handleCancel}>
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 rounded-sm transition-colors">
                  저장
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="w-full text-xs py-1.5 bg-gray-700 hover:bg-gray-600 rounded-sm transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleSetDefaultImage();
                }}>
                기본 이미지 설정
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="w-full text-xs py-1.5 bg-gray-700 hover:bg-gray-600 rounded-sm transition-colors"
            onClick={(e) => {
              e.preventDefault();
            }}>
            프로필 상세보기
          </button>
        )}

        {/* Error message */}
        {errors.file && (
          <div className="bg-red-900 bg-opacity-30 px-4 py-2 text-red-300 text-xs">
            {errors.file.message}
          </div>
        )}

        {/* Status indicator */}
        <div className="flex items-center bg-gray-900 px-4 py-2 border-t border-gray-700">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs text-gray-300">{team}</span>
        </div>
      </div>
    </form>
  );
};

export default PlayerCard;
